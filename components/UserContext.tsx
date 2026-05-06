import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { 
  db, 
  doc, 
  onSnapshot, 
  updateDoc, 
  setDoc,
  auth,
  signInAnonymously,
  onAuthStateChanged,
  handleFirestoreError,
  OperationType
} from '../firebase';
import { UserContext } from './UserContextCore';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const remembered = localStorage.getItem("isLoggedIn") === "true";
    const sessioned = sessionStorage.getItem("isLoggedIn") === "true";
    return remembered || sessioned;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(() => {
    const hasUser = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");
    return !hasUser; 
  });

  // Initialize Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        try {
          await signInAnonymously(auth);
        } catch (err) {
          console.warn("Silent auth error:", err);
        }
      } else {
        // Resolve UID sync if user exists but UID mapping might be stale
        setCurrentUser(prev => {
          if (prev && prev.uid !== user.uid) {
            const updated = { ...prev, uid: user.uid };
            localStorage.setItem("currentUser", JSON.stringify(updated));
            return updated;
          }
          return prev;
        });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []); 

  // Sync currentUser from Firestore in real-time
  useEffect(() => {
    if (isLoggedIn && currentUser?.username && auth.currentUser) {
      const docId = currentUser.username.replace('@', '');
      const unsubscribe = onSnapshot(doc(db, 'users', docId), (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          
          // STRICT ADMIN VALIDATION: ONLY @superadmin CAN HAVE ADMIN ROLE
          const isSuperAdmin = userData.username.toLowerCase() === '@superadmin' || userData.username.toLowerCase() === 'superadmin';
          
          if (userData.role === 'ADMIN' && !isSuperAdmin) {
            console.error("Unauthorized admin access detected for username:", userData.username);
            userData.role = 'USER';
          }

          setCurrentUser(userData);
          localStorage.setItem("currentUser", JSON.stringify(userData));
          localStorage.setItem(`user_data_${userData.username}`, JSON.stringify(userData));
        } else if (currentUser) {
          // If the document doesn't exist in Firestore but we have it locally, sync it!
          // Exclude password from sync to avoid permission issues
          const syncData = { ...currentUser } as any;
          delete syncData.password;
          console.log("Syncing local user to Firestore (excluding sensitive fields)...");
          setDoc(doc(db, 'users', docId), syncData, { merge: true }).catch(err => handleFirestoreError(err, OperationType.WRITE, `users/${docId}`));
        }
      }, (error) => {
        // Only report error if we are still supposedly logged in and auth is present
        if (isLoggedIn && auth.currentUser) {
          handleFirestoreError(error, OperationType.GET, `users/${docId}`);
        }
      });
      return () => unsubscribe();
    }
  }, [isLoggedIn, currentUser]);

  // Sync from storage for cross-tab or other component updates
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("currentUser");
  };

  const resolveStreak = async (action: 'use' | 'buy' | 'reset') => {
    if (!currentUser || !currentUser.username) return;
    const docId = currentUser.username.replace('@', '');
    const userRef = doc(db, 'users', docId);
    
    const updatedUser = { ...currentUser };
    updatedUser.needsStreakProtection = false;

    if (action === 'use') {
      if (updatedUser.streakFreezeCount && updatedUser.streakFreezeCount > 0) {
        updatedUser.streakFreezeCount -= 1;
        updatedUser.streak = updatedUser.previousStreak || updatedUser.streak || 1;
      } else {
        updatedUser.streak = 1;
      }
    } else if (action === 'buy') {
      const cost = 100;
      if ((updatedUser.coins || 0) >= cost) {
        updatedUser.coins = (updatedUser.coins || 0) - cost;
        updatedUser.streak = updatedUser.previousStreak || updatedUser.streak || 1;
      } else {
        alert("Koin tidak cukup!");
        return;
      }
    } else {
      updatedUser.streak = 1;
    }

    updatedUser.previousStreak = 0;
    
    try {
      await updateDoc(userRef, {
        streak: updatedUser.streak,
        streakFreezeCount: updatedUser.streakFreezeCount || 0,
        coins: updatedUser.coins || 0,
        needsStreakProtection: false,
        previousStreak: 0
      });
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${docId}`);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn, logout, isLoading, resolveStreak }}>
      {children}
    </UserContext.Provider>
  );
};
