import React, { createContext, ReactNode, useContext } from 'react';

type AppContextType = {
  handleNotReady: () => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Definiujemy funkcję
  const handleNotReady = () => {
    alert('Feature has not been implemented!');
  };

  return (
    <AppContext.Provider value={{ handleNotReady }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook do korzystania z kontekstu
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
