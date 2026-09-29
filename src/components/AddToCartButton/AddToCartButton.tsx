import React from 'react';
import classNames from '../../utils/classNames';
import './AddToCartButton.scss';

interface Props {
  isInCart: boolean;
  onClick: () => void;
}

export const AddToCartButton: React.FC<Props> = ({ isInCart, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames('add-to-cart-btn', {
        'add-to-cart-btn--added': isInCart,
      })}
    >
      {isInCart ? 'Added' : 'Add to cart'}
    </button>
  );
};
