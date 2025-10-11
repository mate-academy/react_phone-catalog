import { useGlobalActions, useLoadItems } from '@features/index';
import { get } from '@shared/api';
import { CartItem, Product } from '@shared/types';
import { useEffect } from 'react';

type Props = {
  item: CartItem;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};

export const useCartItem = ({ item, setTotal }: Props) => {
  const { setCart } = useGlobalActions();
  const itemInCart = useLoadItems(() => get.product(item.id));

  useEffect(() => {
    item.loadItems();
  }, [item]);

  useEffect(() => {
    if (typeof itemInCart.items !== 'string') {
      setTotal(prev =>
        prev + (itemInCart.items as Product).priceDiscount
          ? (itemInCart.items as Product).priceDiscount
          : (itemInCart.items as Product).priceRegular,
      );
    }
  }, [itemInCart]);

  const onButton = (mod: number, clear: boolean = false) => {
    const newAmount = clear ? 0 : item.amount + mod;

    setCart({ id: item.id, amount: newAmount });
  };

  return { item: itemInCart.items, onButton };
};
