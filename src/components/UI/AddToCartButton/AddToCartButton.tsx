import React, { useContext } from 'react';
import classNames from 'classnames';

import { StoreContext } from '../../../contexts/StoreContext';
import './add-to-cart-button.scss';

type Props = {
  id: string;
};

export const AddToCartButton: React.FC<Props> = ({ id }) => {
  const { cart, changeCart } = useContext(StoreContext);
  const isProductInCart = id in cart;

  return (
    <button
      type="button"
      className={classNames(
        'add-to-cart-button',
        { 'add-to-cart-button--selected': isProductInCart },
      )}
      onClick={() => changeCart(id, 1)}
    >
      {isProductInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
