import React from 'react';

import style from './CartList.module.scss';
import { useStateContext } from '../../state/state';
import { ActionTypes } from '../../enums/ActionTypes';
import classNames from 'classnames';
import { Cart } from '../Cart/Cart';

interface Props {
  className?: string;
}

export const CartList: React.FC<Props> = ({ className }) => {
  const { state, dispatch } = useStateContext();

  const handleIncreaseQuantity = (productId: string) => {
    dispatch({ type: ActionTypes.INCREASE_QUANTITY, payload: productId });
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch({ type: ActionTypes.DECREASE_QUANTITY, payload: productId });
  };

  const handleRemove = (productId: string) => {
    dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: productId });
  };

  return (
    <ul className={classNames(style.cart__list, className)}>
      {state.cart.map(product => (
        <Cart
          key={product.id}
          product={product}
          onIncreaseQuantity={() => handleIncreaseQuantity(product.itemId)}
          onDecreaseQuantity={() => handleDecreaseQuantity(product.itemId)}
          onRemove={() => handleRemove(product.itemId)}
        />
      ))}
    </ul>
  );
};
