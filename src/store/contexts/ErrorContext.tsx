import { createContext, useState } from "react";

export const ErrorContext = createContext({
  error: '',
  setError: (() => { }) as React.Dispatch<React.SetStateAction<string>>
});

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState('');

  return (
    <ErrorContext.Provider value={{error, setError}}>
      {children}
    </ErrorContext.Provider>
  );
};
