import { useMemo } from 'react';
import { useCart } from '../../../hooks/context/useCart';
import { ProductType } from '../../../shared/types/ProductType';

export const useCartPrice = (products: ProductType[]) => {
  const { cartItemsId } = useCart();

  let totalPrice = useMemo(() => {
    const allProduct: { [key: string]: number } = {};

    cartItemsId.forEach(item => {
      if (allProduct[item]) {
        allProduct[item]++;
      } else {
        allProduct[item] = 1;
      }
    });

    let totalPrice = 0;

    products.forEach(item => {
      const count = allProduct[item.itemId];

      if (count) {
        totalPrice += item.price * count;
      }
    });

    return totalPrice;
  }, [products, cartItemsId]);

  return totalPrice;
};
