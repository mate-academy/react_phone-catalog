import './AddToCartButton.scss';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { GlobalContext } from '../../store';
import { Product } from '../../types/Product';

type Props = {
  product: Product,
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
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
      type="button"
      className={classNames('add-to-cart-button', {
        'added-to-cart': isProductInCart,
      })}
      onClick={addToCart}
    >
      {isProductInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
