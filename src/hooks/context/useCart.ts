import { useContext } from 'react';
import { ContextCart } from '../../store/ProviderCart';

export const useCart = () => {
  const ctx = useContext(ContextCart);

  if (!ctx) {
    throw new Error('Error cart context');
  }

  return ctx;
};
