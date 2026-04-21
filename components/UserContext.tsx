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
      if (!currentUser) setIsLoading(true);
      try {
        if (!auth.currentUser) {
          await signInAnonymously(auth);
        }
      } catch (err: any) {
        // CRITICAL: If Anonymous Auth is disabled in console, stop retrying immediately
        if (err.code === 'auth/admin-restricted-operation') {
          console.warn("CRITICAL: Anonymous Authentication is disabled in Firebase Console. Please enable it under Authentication > Sign-in method.");
          setIsLoading(false);
          return;
        }

        console.error("Auth initialization error:", err);
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(initAuth, 2000); // Retry after 2 seconds
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Sync UID to currentUser and Firestore if missing
        setCurrentUser(prev => {
          if (prev && (!prev.uid || prev.uid !== user.uid)) {
            const updatedUser = { ...prev, uid: user.uid };
            
            // Update in storage
            const storage = localStorage.getItem("isLoggedIn") === "true" ? localStorage : sessionStorage;
            storage.setItem("currentUser", JSON.stringify(updatedUser));

            // Update in Firestore
            const docId = prev.username.replace('@', '');
            updateDoc(doc(db, 'users', docId), { uid: user.uid }).catch(e => console.error("Sync UID error:", e));
            
            // Update users_by_uid
            setDoc(doc(db, 'users_by_uid', user.uid), {
              username: prev.username,
              role: prev.role
            }, { merge: true }).catch(e => console.error("Sync users_by_uid error:", e));

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
  }, [currentUser]);

  // Sync currentUser from Firestore in real-time
  useEffect(() => {
    if (isLoggedIn && currentUser?.username) {
      const docId = currentUser.username.replace('@', '');
      const unsubscribe = onSnapshot(doc(db, 'users', docId), (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          
          // STRICT ADMIN VALIDATION
          const userEmail = auth.currentUser?.email;
          const isAdminEmail = userEmail === "devinapurba23@gmail.com" || userEmail === "kiamalau10@gmail.com";
          
          if (userData.role === 'ADMIN' && !isAdminEmail && userData.username.toLowerCase() !== '@superadmin' && userData.username.toLowerCase() !== 'superadmin') {
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
