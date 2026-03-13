import { createContext, ReactNode, useContext, useState } from 'react';

type ContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};

const MyContext = createContext<ContextType | null>(null);

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <MyContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }

  return context;
};
