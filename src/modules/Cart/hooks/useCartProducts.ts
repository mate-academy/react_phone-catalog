import { useMemo } from 'react';
import { useCart } from '../../../hooks/context/useCart';
import { useProducts } from '../../../hooks/context/useProducts';

export const useCartProducts = () => {
  const { products, loading } = useProducts();
  const { cartItemsId } = useCart();

  const cartProducts = useMemo(() => {
    return products.filter(item => cartItemsId.includes(item.itemId));
  }, [products, cartItemsId]);

  return { cartProducts, loading };
};
