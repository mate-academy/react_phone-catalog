import { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const PathContext = createContext<string>('');

export const PathProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <PathContext.Provider value={location.pathname}>
      {children}
    </PathContext.Provider>
  );
};

export const useCurrentPath = () => useContext(PathContext);
