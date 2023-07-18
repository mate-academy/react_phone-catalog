import { useState } from 'react';
import './ProductsCardsButton.scss';

export const ProductsCardsButton = () => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart((prevState: unknown) => !prevState);
  };

  return (
    <button
      type="button"
      className={`card__buy-button ${isAddedToCart ? 'is-activeButton' : ''
      }`}
      onClick={handleAddToCart}
      // disabled={isAddedToCart}
    >
      {isAddedToCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
