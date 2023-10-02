import React, { useContext } from 'react';
import cn from 'classnames';
import './AddToCart.scss';
import { CartContext } from '../../context/CartContext';

type Props = {
  handleAddToCart: () => void,
  id: string,
};

export const AddToCart: React.FC<Props> = ({ handleAddToCart, id }) => {
  const { productsInCart } = useContext(CartContext);

  const isProductAdded = productsInCart.some(
    (cartItem) => (
      cartItem.phoneId === id || cartItem.id === id
    )
    && !cartItem.quantity,
  );

  return (
    <button
      type="button"
      className={cn('AddToCartButton', {
        isProductAdded,
      })}
      onClick={() => {
        handleAddToCart();
      }}
    >
      {isProductAdded ? 'Added to cart' : 'Add to cart' }
    </button>
  );
};
