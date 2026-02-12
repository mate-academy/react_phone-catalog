import { createContext, ReactNode } from 'react';
import { useModalWindow } from '../utils/hooks/UI/useModalWindow';

type BurgerMenuType = ReturnType<typeof useModalWindow>;

export const BurgerMenuContext = createContext<BurgerMenuType | undefined>(
  undefined,
);

export const BurgerMenuProvider = ({ children }: { children: ReactNode }) => {
  const data = useModalWindow();

  return (
    <BurgerMenuContext.Provider value={data}>
      {children}
    </BurgerMenuContext.Provider>
  );
};
