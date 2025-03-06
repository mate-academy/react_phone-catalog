/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useState } from 'react';

import { NavLinks } from '../../../enums/NavLinks';
import { CartItemType } from '../../../modules/Cart/types/CartItemType';
import { CartContext } from '../CartContext';
import { CartType } from '../types/CartType';

interface Props {
  children: React.ReactNode;
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const getCart = (): CartType => {
    return JSON.parse(localStorage.getItem(NavLinks.cart) || '{}');
  };

  const [cart, setCart] = useState<CartType>(getCart());
  const [isModal, setIsModal] = useState(false);

  // #region functions

  const getIsInCart = useCallback(
    (itemId: string) => Object.keys(cart).includes(itemId),
    [cart],
  );

  const addItem = (id: string, props?: CartItemType) => {
    let value = {};

    if (!getIsInCart(id) && props) {
      value = { ...cart, [id]: props };
    } else {
      const updatedProps = { ...cart }[id];
      const { pricePerItem } = updatedProps;

      updatedProps.counter++;
      updatedProps.fullPrice = pricePerItem * updatedProps.counter;

      value = { ...cart, [id]: updatedProps };
    }

    setCart(value);
    localStorage.setItem(NavLinks.cart, JSON.stringify(value));
  };

  const removeItem = (id: string, deleteAll: boolean) => {
    const value = { ...cart };

    if (deleteAll) {
      delete value[id];
    } else {
      const { pricePerItem } = value[id];

      value[id].counter--;
      value[id].fullPrice = pricePerItem * value[id].counter;
    }

    setCart(value);
    localStorage.setItem(NavLinks.cart, JSON.stringify(value));
  };

  // #endregion

  const cartContextValue = useMemo(
    () => ({
      cart,
      isModal,
      addItem,
      getIsInCart,
      removeItem,
      setIsModal,
      setCart,
    }),
    [cart, isModal],
  );

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
