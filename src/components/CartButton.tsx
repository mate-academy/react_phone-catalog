import classNames from 'classnames';
import { FC, useState } from 'react';
import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';

type Props = {
  product: Product,
};

export const CartButton: FC<Props> = ({ product }) => {
  const [addCart, setAddCart] = useState(false);

  const addToCart = () => {
    let cart = [];

    if (localStorage.getItem('carts')) {
      cart = JSON.parse(localStorage.getItem('carts') || '');

      const foundCart = cart.find(
        (item: CartProduct) => item.id === product.id,
      );

      const newCart = {
        id: product.id,
        count: 1,
        price: product.price - ((product.price / 100) * product.discount),
      };

      if (!foundCart) {
        localStorage.setItem('carts', JSON.stringify([
          ...cart,
          newCart,
        ]));
      }

      setAddCart(!addCart);
    }
  };

  const removeFromCart = () => {
    let cart = [];

    if (localStorage.getItem('carts')) {
      cart = JSON.parse(localStorage.getItem('carts') || '');
      const foundCart = cart.find((p: CartProduct) => p.id === product.id);

      if (foundCart) {
        localStorage.setItem('carts', JSON.stringify([...cart.filter(
          (p: CartProduct) => p.id !== product.id,
        )]));
      }

      setAddCart(!addCart);
    }
  };

  return (
    <button
      className={classNames(
        'products-slider__item-button products-slider__item-button-cart', {
          'products-slider__item-button-cart--active':
          localStorage.getItem('carts')?.includes(product.id),
        },
      )}
      type="button"
      onClick={() => {
        if (!localStorage.getItem('carts')?.includes(product.id)) {
          addToCart();
        } else {
          removeFromCart();
        }
      }}
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
