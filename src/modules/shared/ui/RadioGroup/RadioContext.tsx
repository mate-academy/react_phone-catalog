import React, { FC, PropsWithChildren, createContext, useId } from 'react';

export const RadioContext = createContext('');

type Props = PropsWithChildren<{
  name?: string;
}>;

export const RadioProvider: FC<Props> = ({ name, children }) => {
  const spareName = useId();

  return (
    <RadioContext.Provider value={name || spareName}>
      {children}
    </RadioContext.Provider>
  );
};
