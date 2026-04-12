import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { 
  db, 
  doc, 
  onSnapshot, 
  updateDoc, 
  setDoc,
  OperationType, 
  handleFirestoreError,
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

  // Initialize Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Sync UID to currentUser and Firestore if missing
        setCurrentUser(prev => {
          if (prev && !prev.uid) {
            const updatedUser = { ...prev, uid: user.uid };
            
            // Update in storage
            if (localStorage.getItem("isLoggedIn") === "true") {
              localStorage.setItem("currentUser", JSON.stringify(updatedUser));
            } else {
              sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));
            }

            // Update in Firestore
            const docId = prev.username.replace('@', '');
            updateDoc(doc(db, 'users', docId), { uid: user.uid });
            
            // Update users_by_uid
            setDoc(doc(db, 'users_by_uid', user.uid), {
              username: prev.username,
              role: prev.role
            }, { merge: true });

            return updatedUser;
          }
          return prev;
        });
      } else {
        try {
          await signInAnonymously(auth);
        } catch (err: any) {
          // Clear UID if auth fails to prevent stale UIDs from causing permission errors
          setCurrentUser(prev => prev ? { ...prev, uid: undefined } : null);
          
          if (err.code === 'auth/admin-restricted-operation') {
            console.warn("Anonymous Authentication is disabled in Firebase Console. Real-time sync and security rules may be limited.");
          } else {
            console.error("Anonymous auth error:", err);
          }
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync currentUser from Firestore in real-time
  useEffect(() => {
    if (isLoggedIn && currentUser?.username) {
      const docId = currentUser.username.replace('@', '');
      const path = `users/${docId}`;
      const unsubscribe = onSnapshot(doc(db, 'users', docId), (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          
          // STRICT ADMIN VALIDATION
          if (userData.role === 'ADMIN' && userData.username.toLowerCase() !== '@superadmin' && userData.username.toLowerCase() !== 'superadmin') {
            console.error("Unauthorized admin access detected. Downgrading role.");
            userData.role = 'USER';
            // Optionally update Firestore too
            updateDoc(doc(db, 'users', docId), { role: 'USER' });
          }

          setCurrentUser(userData);
          localStorage.setItem("currentUser", JSON.stringify(userData));
          localStorage.setItem(`user_data_${userData.username}`, JSON.stringify(userData));
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      });
      return () => unsubscribe();
    }
  }, [isLoggedIn, currentUser?.username]);

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

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};
