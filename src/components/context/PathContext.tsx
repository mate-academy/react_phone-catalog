import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const PathContext = createContext({
  pathname: '',
  search: '',
});

export const PathProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <PathContext.Provider
      value={{
        pathname: location.pathname,
        search: location.search,
      }}
    >
      {children}
    </PathContext.Provider>
  );
};

export const useCurrentPath = () => useContext(PathContext);
