import { useContext } from 'react';
import { BurgerMenuContext } from '../../../store/BurgerMenuContext';

export const useBurgerMenu = () => {
  const ctx = useContext(BurgerMenuContext);

  if (!ctx) {
    throw new Error(
      'useBurgerMenuContext must be used within BurgerMenuProvider',
    );
  }

  return ctx;
};
