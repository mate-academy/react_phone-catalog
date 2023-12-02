import React from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartProvider';

import './AddToCart.scss';

type Props = {
  product: Product,
};

export const AddToCart: React.FC<Props> = ({ product }) => {
  const { cart, handleAddToCart } = useCart();
  const isProductInCart = cart.some(item => item.id === product.id);

  return (
    <button
      type="button"
      className={cn('AddToCart', {
        'added-to-cart': isProductInCart,
      })}
      onClick={event => {
        event.preventDefault();
        handleAddToCart(product);
      }}
    >
      {isProductInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
