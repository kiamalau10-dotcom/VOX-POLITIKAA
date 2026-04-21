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

  // Initialize Firebase Auth & Listen for State Changes
  useEffect(() => {
    let isInitialLoad = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Aggressive sync: ensuring currentUser has UID and UID is linked to role in Firestore
        setCurrentUser(prev => {
          if (prev) {
            if (prev.uid === user.uid) return prev; // Avoid unnecessary updates

            const updatedUser = { ...prev, uid: user.uid };
            
            // 1. Sync local storage
            const remembered = localStorage.getItem("isLoggedIn") === "true";
            const storage = remembered ? localStorage : sessionStorage;
            storage.setItem("currentUser", JSON.stringify(updatedUser));

            // 2. Sync to Firestore (Silent background updates)
            const docId = prev.username.replace('@', '');
            updateDoc(doc(db, 'users', docId), { uid: user.uid }).catch(() => {});
            
            setDoc(doc(db, 'users_by_uid', user.uid), {
              username: prev.username,
              role: prev.role
            }, { merge: true }).catch(() => {});

            return updatedUser;
          }
          return prev;
        });
        setIsLoading(false);
      } else if (isInitialLoad) {
        // Initial attempt at anonymous login if no user
        signInAnonymously(auth).catch((err) => {
          if (err.code === 'auth/admin-restricted-operation') {
            console.warn("CRITICAL: Anonymous Authentication is disabled in Firebase Console.");
          }
          setIsLoading(false);
        });
      }
      isInitialLoad = false;
    });

    return () => unsubscribe();
  }, []); // EMPTY dependency array to prevent loops

  // Sync currentUser from Firestore in real-time
  useEffect(() => {
    if (isLoggedIn && currentUser?.username) {
      const docId = currentUser.username.replace('@', '');
      const unsubscribe = onSnapshot(doc(db, 'users', docId), (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          
          // STRICT ADMIN VALIDATION (ONLY FOR NON-HARDCODED USERNAMES)
          const userEmail = auth.currentUser?.email;
          const isAdminEmail = userEmail === "devinapurba23@gmail.com" || userEmail === "kiamalau10@gmail.com";
          const isHardcodedAdmin = userData.username.toLowerCase() === '@superadmin' || userData.username.toLowerCase() === 'superadmin';
          
          // Only downgrade if they have an email from OAuth and it's NOT an admin email,
          // OR if they are an admin but not hardcoded and don't have an admin email.
          // This allows local admin accounts (like @superadmin) to work even on anonymous auth.
          if (userData.role === 'ADMIN' && userEmail && !isAdminEmail && !isHardcodedAdmin) {
            console.error("Unauthorized admin access detected for identifier:", userEmail);
            userData.role = 'USER';
          }

          setCurrentUser(userData);
          localStorage.setItem("currentUser", JSON.stringify(userData));
          localStorage.setItem(`user_data_${userData.username}`, JSON.stringify(userData));
        }
      }, (error) => {
        console.warn("User data sync error:", error);
        // Don't throw here to avoid "Uncaught Error" in async listener
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
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
