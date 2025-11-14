import { useContext, useMemo } from 'react';
import { GlobalContext } from '../../../../../context/GlobalContext';
import { ProductDetails } from '../../../../../types/ProductDetails';

export const useProductStatus = (selectedProduct: ProductDetails) => {
  const { cart, favorites } = useContext(GlobalContext);

  const isInCart = useMemo(
    () => cart.some(item => item.id === selectedProduct.id),
    [cart, selectedProduct.id],
  );

  const isFavorite = useMemo(
    () => favorites.some(item => item.itemId === selectedProduct.id),
    [favorites, selectedProduct.id],
  );

  return { isInCart, isFavorite };
};
