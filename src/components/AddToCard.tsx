import React, { useContext, useState } from 'react';
import cn from 'classnames';
import './AddToCard.scss';
import { CartContext } from '../context/CardContext';

type Props = {
  handleAddToCart: () => void,
  id: string,
};

export const AddToCart: React.FC<Props> = ({ handleAddToCart, id }) => {
  const { productsInCart } = useContext(CartContext);
  const [isClicked, setIsClicked] = useState(false);

  const isProductAdded = productsInCart.some(
    (cartItem) => (
      cartItem.phoneId === id || cartItem.id === id
    )
    && cartItem.quantity !== 0,
  );

  const handleClick = () => {
    setIsClicked(!isClicked);
    handleAddToCart();
  };

  return (
    <button
      type="button"
      className={cn('AddToCartButton', {
        isProductAdded,
        'is-clicked': isClicked,
      })}
      onClick={handleClick}
    >
      <span className="button-text">
        {isProductAdded ? 'Added to cart' : 'Add to cart'}
      </span>
    </button>
  );
};
