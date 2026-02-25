import { useContext } from 'react';
import { ContextProduct } from '../../store/ProviderProduct';

export const useProducts = () => {
  const ctx = useContext(ContextProduct);

  if (!ctx) {
    throw new Error('Products Context Error');
  }

  return ctx;
};
