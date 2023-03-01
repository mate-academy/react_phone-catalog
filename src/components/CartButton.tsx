import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';

type Props = {
  id: string,
  product: Product,
};

export const CartButton: FC<Props> = ({ id, product }) => {
  const [isAddedInCart, setIsAddedInCart] = useState(false);

  useEffect(() => {
    const cartStorage = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart') || '')
      : [];

    if (cartStorage.find(
      (cartList: CartProduct) => cartList.item.id === id,
    )) {
      setIsAddedInCart(true);
    } else {
      setIsAddedInCart(false);
    }
  });

  const toggleCart = () => {
    if (isAddedInCart) {
      let cartStorage = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart') || '')
        : [];

      cartStorage = cartStorage.filter((cartList: CartProduct) => (
        cartList.item.id !== id
      ));
      window.localStorage.setItem('cart', JSON.stringify(cartStorage));

      setIsAddedInCart(!isAddedInCart);
    } else {
      const cartStorage = localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart') || '')
        : [];

      cartStorage.push({ count: 1, item: { ...product } });
      window.localStorage.setItem('cart', JSON.stringify(cartStorage));

      setIsAddedInCart(!isAddedInCart);
    }
  };

  return (
    <button
      className={classNames(
        'products-slider__item-button products-slider__item-button-cart', {
          'products-slider__item-button-cart--active': isAddedInCart,
        },
      )}
      type="button"
      onClick={() => toggleCart()}
    >
      {isAddedInCart && (
        'Added to cart'
      )}
      {!isAddedInCart && (
        'Add to cart'
      )}
    </button>
  );
};
