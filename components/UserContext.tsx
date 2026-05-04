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
  onAuthStateChanged
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
    return !hasUser; // Only show global loading if we don't have a cached user
  });

  // Initialize Firebase Auth
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    const initAuth = async () => {
      // Only show loading if we don't have a user yet
      if (!localStorage.getItem("currentUser") && !sessionStorage.getItem("currentUser")) {
        setIsLoading(true);
      }
      try {
        if (!auth.currentUser) {
          await signInAnonymously(auth);
        }
      } catch (err: any) {
        if (err.code === 'auth/admin-restricted-operation') {
          console.warn("CRITICAL: Anonymous Authentication is disabled in Firebase Console.");
          setIsLoading(false);
          return;
        }

        if (err.code === 'auth/network-request-failed' || err.message?.includes('offline')) {
          console.info("Auth operating in offline mode.");
          setIsLoading(false);
          return;
        }

        if (err.code === 'auth/too-many-requests') {
          console.warn("Auth hammered. Waiting longer before retry...");
          setTimeout(initAuth, 10000); 
          return;
        }

        console.error("Auth initialization error:", err);
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(initAuth, 3000); 
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(prev => {
          if (prev) {
            const updatedUser = { ...prev, uid: user.uid };
            const storage = (localStorage.getItem("isLoggedIn") === "true" || sessionStorage.getItem("isLoggedIn") === "true") ? localStorage : sessionStorage;
            
            // Only update if UID actually changed or was missing
            if (prev.uid !== user.uid) {
              storage.setItem("currentUser", JSON.stringify(updatedUser));
              const docId = prev.username.replace('@', '');
              updateDoc(doc(db, 'users', docId), { uid: user.uid }).catch(e => console.error("Sync UID error:", e));
              
              setDoc(doc(db, 'users_by_uid', user.uid), {
                username: prev.username,
                role: prev.role
              }, { merge: true }).catch(e => console.error("Sync users_by_uid error:", e));
            }

            return updatedUser;
          }
          return prev;
        });
        setIsLoading(false);
      } else {
        initAuth();
      }
    });

    return () => unsubscribe();
  }, []); // Removed [currentUser] to break the loop

  // Sync currentUser from Firestore in real-time
  useEffect(() => {
    if (isLoggedIn && currentUser?.username) {
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
          setDoc(doc(db, 'users', docId), syncData, { merge: true }).catch(err => console.error("Initial user sync error:", err));
        }
      }, (error) => {
        console.warn("User data sync error:", error);
        // Don't throw here to avoid "Uncaught Error" in async listener
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
      console.error("Error resolving streak:", error);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn, logout, isLoading, resolveStreak }}>
      {children}
    </UserContext.Provider>
  );
};
