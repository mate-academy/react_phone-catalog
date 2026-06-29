import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export const useCatalog = () => {
  const store = useContext(CartContext);

  if (!store) {
    throw new Error(
      'useCatalogStore must be used inside a StoreCatalogProvider',
    );
  }

  return store;
};
