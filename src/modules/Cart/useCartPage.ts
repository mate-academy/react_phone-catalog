import { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ContextProps } from '../../types/ContextProps';

export const useCartPage = () => {
  const { cart, products } = useOutletContext<ContextProps>();

  const cartProducts = useMemo(() => {
    return cart.reduce(
      (acc, cartItem) => {
        const productData = products.find(p => p.itemId === cartItem.id);

        if (productData) {
          acc.push({
            ...productData,
            quantity: cartItem.quantity,
          });
        }

        return acc;
      },
      [] as Array<(typeof products)[0] & { quantity: number }>,
    );
  }, [cart, products]);

  const totalPrice = useMemo(() => {
    return cartProducts.reduce(
      (sum, item) => sum + (item.price || item.fullPrice) * item.quantity,
      0,
    );
  }, [cartProducts]);

  const totalQuantity = useMemo(() => {
    return cartProducts.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartProducts]);

  return {
    cartProducts,
    totalPrice,
    totalQuantity,
    isEmpty: cartProducts.length === 0,
  };
};
