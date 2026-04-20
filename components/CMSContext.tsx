import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, doc, onSnapshot, updateDoc } from '../firebase';

interface CMSContextType {
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  cmsData: Record<string, any>;
  updateCMS: (key: string, value: any) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [cmsData, setCmsData] = useState<Record<string, any>>({});

  useEffect(() => {
    const docRef = doc(db, 'settings', 'cms');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setCmsData(docSnap.data());
      } else {
        // Initialize with local data if Firestore is empty
        const saved = localStorage.getItem('vox_cms_data');
        if (saved) {
          const localData = JSON.parse(saved);
          setCmsData(localData);
          // Don't push to Firestore here to avoid permission issues if not admin
        }
      }
    }, (error) => {
      console.warn("CMS data sync error:", error);
    });
    return () => unsubscribe();
  }, []);

  const updateCMS = async (key: string, value: any) => {
    const newData = { ...cmsData, [key]: value };
    setCmsData(newData);
    localStorage.setItem('vox_cms_data', JSON.stringify(newData));
    
    // Sync to Firestore
    try {
      await updateDoc(doc(db, 'settings', 'cms'), { [key]: value });
    } catch (e) {
      console.warn("CMS Sync error (may need admin perms):", e);
    }
  };

  return (
    <CMSContext.Provider value={{ isEditMode, setIsEditMode, cmsData, updateCMS }}>
      {children}
    </CMSContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within a CMSProvider');
  return context;
};
