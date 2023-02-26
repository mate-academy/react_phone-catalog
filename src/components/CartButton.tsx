import classNames from 'classnames';
import { FC, useState } from 'react';
import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';

type Props = {
  product: Product,
};

export const CartButton: FC<Props> = ({ product }) => {
  const [isAddCart, setIsAddCart] = useState(false);

  const toggleCart = () => {
    const carts = JSON.parse(localStorage.getItem('carts') || '');
    const newCart = {
      id: product.id,
      count: 1,
      price: product.price - ((product.price / 100) * product.discount),
    };

    const foundCart
      = carts.find((item: CartProduct) => item.id === product.id);

    if (!foundCart) {
      localStorage.setItem('carts', JSON.stringify([
        ...carts, newCart,
      ]));
    }

    if (foundCart) {
      localStorage.setItem('carts', JSON.stringify([
        ...carts.filter((item: CartProduct) => item.id !== product.id),
      ]));
    }

    setIsAddCart(!isAddCart);
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
      onClick={toggleCart}
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
