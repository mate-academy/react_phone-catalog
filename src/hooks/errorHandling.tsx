import React, { createContext, useContext, useState } from 'react';

interface ErrorContextType {
  isError: boolean;
  setIsError: (p: boolean) => void;
}

type Props = {
  children: React.ReactNode;
};

const ErrorHandlingContext = createContext<ErrorContextType | undefined>(
  undefined,
);

export const ErrorHandlingProvider = ({ children }: Props) => {
  const [isError, setIsError] = useState(false);

  return (
    <ErrorHandlingContext.Provider value={{ isError, setIsError }}>
      {children}
    </ErrorHandlingContext.Provider>
  );
};

export const useErrorHandling = () => {
  const errorHandlingContext = useContext(ErrorHandlingContext);

  if (!errorHandlingContext) {
    throw new Error(
      'useErrorHandling must be used within an ErrorHandlingProvider',
    );
  }

  return errorHandlingContext;
};
