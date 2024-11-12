import React, { useContext } from 'react';

interface Props<TContext> {
  initialValue: TContext;
}

export const contextFactory = <TContext>({ initialValue }: Props<TContext>) => {
  const context = React.createContext<TContext>(initialValue);

  const useCtx = () => {
    const ctx = useContext(context);

    if (useCtx === undefined) {
      throw Error('useContext must be used inside of a Provider');
    }

    return ctx;
  };

  return { context, useContext: useCtx };
};
