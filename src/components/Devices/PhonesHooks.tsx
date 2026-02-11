import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type ContextProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

const HooksContext = createContext<ContextProps | null>(null);

export const PhonesContextProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activePage, setActivePage] = useState(1);

  return (
    <HooksContext.Provider
      value={{
        loading,
        setLoading,
        error,
        setError,
        activePage,
        setActivePage,
      }}
    >
      {children}
    </HooksContext.Provider>
  );
};

export const PhonesHooks = (): ContextProps => {
  const context = useContext(HooksContext);

  if (!context) {
    throw new Error('Context Error');
  }

  return context;
};
