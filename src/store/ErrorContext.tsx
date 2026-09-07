import { createContext, useState } from 'react';

type Context = {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ErrorContext = createContext<Context>({
  errorMessage: '',
  setErrorMessage: () => {},

  isLoading: false,
  setIsLoading: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    errorMessage,
    setErrorMessage,
    isLoading,
    setIsLoading,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
