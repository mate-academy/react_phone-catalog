import { useGlobalActions, useLoadItems } from '@features/index';
import { get } from '@shared/api';
import { CartItem, Product } from '@shared/types';
import { useEffect } from 'react';

type Props = {
  cartItem: CartItem;
  updatePrice: (id: string, price: number) => void;
};

export const useCartItemWidget = ({ cartItem, updatePrice }: Props) => {
  const { items, loadItems } = useLoadItems(() => get.product(cartItem.id));
  const { setCart } = useGlobalActions();

  useEffect(() => {
    loadItems();
  }, [cartItem.id]);

  const onButton = (mod: number) => {
    const newAmount = mod + cartItem.amount;

    if (newAmount < 1) {
      setCart({ id: cartItem.id, amount: 0 });
    } else {
      setCart({ id: cartItem.id, amount: cartItem.amount + mod });
    }
  };

  useEffect(() => {
    if (typeof items !== 'string') {
      const price = (items as Product).priceDiscount
        ? (items as Product).priceDiscount
        : (items as Product).priceRegular;

      updatePrice(cartItem.id, price);
    }
  }, [items]);

  const getPrice = () => {
    const price =
      ((items as Product).priceDiscount || (items as Product).priceRegular) *
      cartItem.amount;

    return `$${price}`;
  };

  return { items, onButton, getPrice };
};
