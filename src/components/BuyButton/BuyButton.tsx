import classNames from 'classnames';
import React, { useState } from 'react';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
  inDetails: boolean;
};

export const BuyButton: React.FC<Props> = ({
  product,
  inDetails = false,
}) => {
  const stateCondition = localStorage.getItem('cartItems')?.includes(product.id)
    || false;
  const [isInCart, setIsInCart] = useState(stateCondition);

  const handleBuyButton = () => {
    let cartItems = [];

    if (localStorage.getItem('cartItems')) {
      cartItems = JSON.parse(localStorage.getItem('cartItems') || '');
    }

    if (cartItems.find((prod: Product) => prod.id === product.id)) {
      localStorage.setItem('cartItems', JSON.stringify([
        ...cartItems.filter((prod: Product) => prod.id !== product.id),
      ]));
    } else {
      localStorage.setItem('cartItems', JSON.stringify([
        ...cartItems,
        product,
      ]));
    }

    window.dispatchEvent(new Event('storage'));

    setIsInCart(!isInCart);
  };

  return (
    <button
      type="button"
      className={classNames('buttons__buy-button buy-button', {
        'buy-button--in-cart': isInCart,
        'buy-button--in-details': inDetails,
      })}
      onClick={handleBuyButton}
    >
      {isInCart
        ? 'Added to cart'
        : 'Add to cart'}
    </button>
  );
};
