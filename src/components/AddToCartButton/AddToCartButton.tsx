import React, { useContext } from 'react';
import cn from 'classnames';

import { Product } from '../../types/Product';
import './AddToCartButton.scss';
import { CartContext } from '../../context/CartContext';

type Props = {
  product: Product,
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const { cart, handleAddToCart } = useContext(CartContext);
  const isProductInCart = cart.some(item => item.id === product.id);

  return (
    <button
      type="button"
      className={cn('AddToCartButton', {
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
