/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './ActionButtons.scss';
import '../../styles/utils/typography.scss';

export const ActionButtons: React.FC = () => {
  return (
    <div className="action">
      <button
        type="button"
        name="add-to-cart"
        className="add-to-cart-button action__button button"
      >
        Add to cart
      </button>

      <button
        type="button"
        name="add-to-favourite"
        className="favourite-button action__button"
      >
        <img src="icons/SelectedToFaforitesIcon.svg" alt="Add to favourites" />
      </button>
    </div>
  );
};
