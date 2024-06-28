/* eslint-disable  @typescript-eslint/indent */
import React, { FC, PropsWithChildren, createContext, useContext } from 'react';
import { useModalWindow } from '../../hooks/useModalWindow';

type State = ReturnType<typeof useModalWindow> | null;

const WarningContext = createContext<State>(null);

export const WarningProvier: FC<
  PropsWithChildren<{ value: Exclude<State, null> }>
> = ({ children, value }) => {
  return (
    <WarningContext.Provider value={value}>{children}</WarningContext.Provider>
  );
};

export const useWarning = () => {
  const warning = useContext(WarningContext);

  if (!warning) {
    throw new Error('no WarningProvier found');
  }

  return warning;
};
