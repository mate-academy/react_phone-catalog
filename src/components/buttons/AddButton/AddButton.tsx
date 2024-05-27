import React, { useContext } from 'react';

import classNames from 'classnames';

import { Product } from '../../../types/Product';
import { GlobalContext } from '../../../GlobalContext';

import classes from './AddButton.module.scss';

type Props = {
  product: Product;
};

export const AddButton: React.FC<Props> = ({ product }) => {
  const { cart, dispatch } = useContext(GlobalContext);
  const isProductInCart = cart.some(item => item.id === product.id);

  const addToCart = () => {
    const newProduct = {
      ...product,
      amount: 1,
    };
    const index = cart.findIndex(item => item.id === newProduct.id);

    if (index === -1) {
      dispatch({ type: 'ADD_TO_CART', payload: newProduct });
    } else {
      dispatch({ type: 'DELETE_FROM_CART', payload: newProduct });
    }
  };

  return (
    <button
      className={classNames(classes.AddButton, {
        [classes['AddButton--inCart']]: isProductInCart,
      })}
      type="button"
      onClick={addToCart}
    >
      {isProductInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
