import { useContext } from 'react';
import { ContextBurgerMenu } from '../../store/ProviderBurgerMenu';

export const useBurgerMenu = () => {
  const ctx = useContext(ContextBurgerMenu);

  if (!ctx) {
    throw new Error('Burger Menu Context Error');
  }

  return ctx;
};
