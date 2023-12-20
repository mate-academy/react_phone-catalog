import React, { createContext, useContext, useState } from 'react';

interface ContextType {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider: React.FC = ({ children }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <Context.Provider value={{ searchText, setSearchText }}>
      {children}
    </Context.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }

  return context;
};
