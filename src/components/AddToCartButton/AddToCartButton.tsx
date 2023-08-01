import React, { useContext } from 'react';
import cn from 'classnames';

import { CartContext } from '../CartProvider/CartProvider';

import './AddToCartButton.scss';

type Props = {
  handleAddToCart: () => void;
  id: string;
};

export const AddToCartButton: React.FC<Props> = ({ handleAddToCart, id }) => {
  const { productsInCart } = useContext(CartContext);

  const isItemInCart = productsInCart.some(
    (cartItem) => cartItem.id === id && cartItem.quantity !== 0,
  );

  return (
    <button
      type="button"
      className={cn('AddToCartButton', {
        added: isItemInCart,
      })}
      onClick={() => {
        handleAddToCart();
      }}
    >
      {isItemInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
