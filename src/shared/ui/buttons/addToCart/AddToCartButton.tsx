import React, { useContext } from 'react';
import styles from './AddToCartButton.module.scss';
import { Product } from '../../../types/Product';
import {
  CartDispatchContext,
  CartStateContext,
} from '../../../context/CartContext';

type Props = {
  product?: Product;
};

export const AddToCart: React.FC<Props> = ({ product }) => {
  const { cartItems } = useContext(CartStateContext);
  const cartDispatch = useContext(CartDispatchContext);

  const isInCart = product
    ? cartItems.some(cartItem => cartItem.id === product.id)
    : false;

  const addToCart = () => {
    if (isInCart) {
      return;
    }

    if (product) {
      cartDispatch({
        type: 'add_cartItem',
        payload: {
          id: product.id,
          quantity: 1,
          product,
        },
      });
    }
  };

  const removeFromCart = () => {
    if (!isInCart) {
      return;
    }

    if (product) {
      cartDispatch({
        type: 'delete_cartItem',
        payload: {
          id: product.id,
        },
      });
    }
  };

  const handleCartButtonClick = () =>
    isInCart ? removeFromCart() : addToCart();

  return (
    <button
      className={`button-text ${isInCart ? styles.addedButton : styles.addButton}`}
      onClick={handleCartButtonClick}
    >
      {isInCart ? 'Added' : 'Add to cart'}
    </button>
  );
};
