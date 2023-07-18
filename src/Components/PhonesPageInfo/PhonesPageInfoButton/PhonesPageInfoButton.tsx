import { useState } from 'react';
import './PhonesPageInfoButton.scss';

export const PhonesPageInfoButton = () => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart((prevState: unknown) => !prevState);
  };

  return (
    <button
      type="button"
      className={`card__buy-buttons ${isAddedToCart ? 'is-activeButton' : ''
      }`}
      onClick={handleAddToCart}
    // disabled={isAddedToCart}
    >
      {isAddedToCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
