import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';

type Props = {
  id: string,
  product: Product,
};

export const CartButton: FC<Props> = ({ id, product }) => {
  const [addCart, setAddCart] = useState(false);

  useEffect(() => {
    const storageValue: string | null = localStorage.getItem('cart');
    const parsedStorage: CartProduct[] | [] = storageValue
      ? JSON.parse(storageValue)
      : [];

    if (parsedStorage.find(
      (cartList: CartProduct) => cartList.item.id === id,
    )) {
      setAddCart(true);
    } else {
      setAddCart(false);
    }
  }, []);

  const addToCart = () => {
    if (addCart) {
      const storageValue: string | null = localStorage.getItem('cart');

      let cartStorage = storageValue ? JSON.parse(storageValue) : [];

      cartStorage = cartStorage.filter((cartList: CartProduct) => (
        cartList.item.id !== id
      ));
      window.localStorage.setItem('cart', JSON.stringify(cartStorage));

      setAddCart(!addCart);
    } else {
      const storageValue: string | null = localStorage.getItem('cart');

      const cartStorage = storageValue ? JSON.parse(storageValue) : [];

      cartStorage.push({ count: 1, item: { ...product } });
      window.localStorage.setItem('cart', JSON.stringify(cartStorage));

      setAddCart(!addCart);
    }
  };

  return (
    <button
      className={classNames(
        'products-slider__item-button products-slider__item-button-cart', {
          'products-slider__item-button-cart--active': addCart,
        },
      )}
      type="button"
      onClick={() => addToCart()}
    >
      {localStorage.getItem('carts')?.includes(product.id) && (
        'Added to cart'
      )}
      {!localStorage.getItem('carts')?.includes(product.id) && (
        'Add to cart'
      )}
    </button>
  );
};
