import { CartItem } from '@features/globalStore/types';
import { useGlobalActions, useGlobalData, useLoadItems } from '@features/index';
import { get } from '@shared/api';
import { Product } from '@shared/types';
import { useEffect } from 'react';

type TrueCartItem = {
  product: Product;
  amount: number;
  total: number;
};

export const useCartPage = () => {
  const { itemsInCart } = useGlobalData();
  const { toggleModal } = useGlobalActions();
  const cart = useLoadItems(() => get.cart(itemsInCart));

  useEffect(() => {
    cart.reload();
  }, [itemsInCart]);

  const getWidgetProps = (el: CartItem | TrueCartItem) => {
    const nullConf = {
      name: '',
      id: (el as CartItem).id,
      total: '---',
      amount: el.amount,
      image: '',
    };

    if (Object.hasOwn(el, 'id')) {
      return nullConf;
    } else {
      const item = el as TrueCartItem;

      return {
        name: item.product.name,
        id: item.product.id,
        total: item.total,
        amount: item.amount,
        image: item.product.images[0],
      };
    }
  };

  return { cart: cart.data, itemsInCart, getWidgetProps, toggleModal };
};
