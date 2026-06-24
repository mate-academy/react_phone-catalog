import React, { createContext, useContext, useState } from 'react';

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const LoadingProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
