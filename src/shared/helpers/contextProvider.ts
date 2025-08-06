import { useContext } from 'react';

const useProvider = <T>(context: React.Context<T | null>) => {
  const contextValue = useContext(context);

  if (!context) {
    throw new Error('Context must be used within relative Provider');
  }

  return contextValue;
};

const createContextHook = <T>(context: React.Context<T | null>) => {
  return () => useProvider(context);
};

export { createContextHook };
