import React, { useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { CartItem } from '../../types/CartItem';

type Props = {
  product: Product,
};

export const AddCartButton:React.FC<Props> = ({ product }) => {
  const [handleChange, setHandleChange] = useState(false);

  const addToCart = () => {
    let carts = [];

    if (localStorage.getItem('carts')) {
      carts = JSON.parse(localStorage.getItem('carts') || '');
    }

    if (!carts.find((p: CartItem) => p.id === product.id)) {
      localStorage.setItem('carts', JSON.stringify([
        ...carts,
        {
          id: product.id,
          count: 1,
          price: product.newPrice,
        },
      ]));
    } else {
      localStorage.setItem('carts', JSON.stringify([
        ...carts.filter((p: CartItem) => p.id !== product.id),
      ]));
    }

    setHandleChange(!handleChange);
  };

  return (
    <button
      className={classNames('products-slider__item-button products-slider__item-button-cart', {
        'products-slider__item-button-cart--active': localStorage.getItem('carts')?.includes(product.id),
      })}
      type="button"
      onClick={addToCart}
    >
      Add to cart
    </button>
  );
};
