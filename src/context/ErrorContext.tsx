/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext, useContext, useState } from 'react';

const ErrorContext = createContext('');
const SetErrorContext = createContext((v: string) => {});

export const useError = () => useContext(ErrorContext);
export const useSetError = () => useContext(SetErrorContext);

type Props = {
  children: React.ReactNode;
};

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState('');

  return (
    <SetErrorContext.Provider value={setError}>
      <ErrorContext.Provider value={error}>{children}</ErrorContext.Provider>
    </SetErrorContext.Provider>
  );
};
