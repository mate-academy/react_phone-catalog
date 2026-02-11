import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type ContextProps = {
  loading: boolean;
  setLoadingParams: React.Dispatch<React.SetStateAction<boolean>>;
  errorParams: boolean;
  setErrorParams: React.Dispatch<React.SetStateAction<boolean>>;
};

const HooksContext = createContext<ContextProps | null>(null);

export const ParamsContextProvider: React.FC<Props> = ({ children }) => {
  const [loadingParams, setLoadingParams] = useState(false);
  const [errorParams, setErrorParams] = useState(false);

  return (
    <HooksContext.Provider
      value={{
        loading: loadingParams,
        setLoadingParams,
        errorParams,
        setErrorParams,
      }}
    >
      {children}
    </HooksContext.Provider>
  );
};

export const ParamsHooks = (): ContextProps => {
  const context = useContext(HooksContext);

  if (!context) {
    throw new Error('Context Error');
  }

  return context;
};
