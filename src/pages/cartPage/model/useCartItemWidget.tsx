import { CartItem } from '@features/globalStore/types';
import { useGlobalActions } from '@features/index';
import { get, useLoadItems } from '@shared/api';
import { useCallback, useEffect } from 'react';

type Props = {
  cartItem: CartItem;
  updatePrice: (id: string, price: number) => void;
};

export const useCartItemWidget = ({ cartItem, updatePrice }: Props) => {
  const fetcher = useCallback(() => get.product(cartItem.id), [cartItem.id]);

  const { items, loadItems } = useLoadItems(fetcher);
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
      const price = items.priceDiscount
        ? items.priceDiscount
        : items.priceRegular;

      updatePrice(cartItem.id, price);
    }
  }, [items]);

  return { items, onButton };
};
