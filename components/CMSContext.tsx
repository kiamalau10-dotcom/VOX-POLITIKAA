import React, { createContext, useContext, useState } from 'react';

interface CMSContextType {
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  cmsData: Record<string, any>;
  updateCMS: (key: string, value: any) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [cmsData, setCmsData] = useState<Record<string, any>>(() => {
    const saved = localStorage.getItem('vox_cms_data');
    return saved ? JSON.parse(saved) : {};
  });

  const updateCMS = (key: string, value: any) => {
    const newData = { ...cmsData, [key]: value };
    setCmsData(newData);
    localStorage.setItem('vox_cms_data', JSON.stringify(newData));
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
