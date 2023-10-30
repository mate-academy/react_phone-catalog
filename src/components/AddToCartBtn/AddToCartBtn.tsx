import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { CartList } from '../../types/CartList';
import { ProductItem } from '../../types/ProductItem';

import './addToCartBtn.scss';

type Props = {
  id: string;
  card: ProductItem;
};

export const AddToCartBtn: React.FC<Props> = ({ id, card }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const storageValue: string | null = localStorage.getItem('cart');
    const parsedStorage: CartList[] | [] = storageValue
      ? JSON.parse(storageValue)
      : [];

    if (parsedStorage.find((cartList: CartList) => cartList.item.id === id)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, []);

  const addToCart = () => {
    if (isActive) {
      const storageValue: string | null = localStorage.getItem('cart');

      let parsedStorage = storageValue ? JSON.parse(storageValue) : [];

      parsedStorage = parsedStorage.filter((cartList: any) => (
        cartList.item.id !== id
      ));
      window.localStorage.setItem('cart', JSON.stringify(parsedStorage));

      setIsActive(!isActive);
    } else {
      const storageValue: string | null = localStorage.getItem('cart');

      const parsedStorage = storageValue ? JSON.parse(storageValue) : [];

      parsedStorage.push({ count: 1, item: { ...card } });
      window.localStorage.setItem('cart', JSON.stringify(parsedStorage));

      setIsActive(!isActive);
    }
  };

  return (
    <button
      type="button"
      className={classNames(
        'add-to-cart',
        { 'add-to-cart_active': isActive },
      )}
      onClick={() => addToCart()}
    >
      {isActive
        ? 'Added to cart'
        : 'Add to cart'}
    </button>
  );
};
