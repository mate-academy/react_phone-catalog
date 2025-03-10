import React, { createContext, ReactNode, useMemo, useState } from 'react';

interface BurgerContextType {
  burgerMenuActivate: boolean;
  setBurgerMenuActivate: (value: boolean) => void;
}

export const BurgerContext = createContext<BurgerContextType>({
  burgerMenuActivate: false,
  setBurgerMenuActivate: () => {},
});

type Props = {
  children: ReactNode;
};

export const BurgerProvider: React.FC<Props> = ({ children }) => {
  const [burgerMenuActivate, setBurgerMenuActivate] = useState<boolean>(false);
  const value = useMemo(
    () => ({
      burgerMenuActivate,
      setBurgerMenuActivate,
    }),
    [burgerMenuActivate],
  );

  return (
    <BurgerContext.Provider value={value}>{children}</BurgerContext.Provider>
  );
};
