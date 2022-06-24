// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from 'react';

export const LocalStorageContext = React.createContext({
  storageItems: localStorage.length,
  setStorageItems: (storageItems: number): number => {
    const newItems = storageItems + 1;

    return (newItems);
  },
});

export const LocalStorageProvider = ({ children }) => {
  const [storageItems, setStorageItems] = useState(localStorage.length);

  const contextValue = {
    storageItems,
    setStorageItems,
  };

  return (
    <LocalStorageContext.Provider value={contextValue}>
      { children }
    </LocalStorageContext.Provider>
  );
};
