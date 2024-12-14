import React from 'react';
import { CartItem } from '../CartItem/CartItem';
import { useStateContext } from '../../../../state/state';
import { ActionTypes } from '../../../../enums/action-types.enum';
import './CartList.scss';
import classNames from 'classnames';

type Props = {
  className?: string;
};

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
    <ul className={classNames(className, 'cart__list')}>
      {state.cart.map(product => (
        <CartItem
          key={product.itemId}
          product={product}
          onIncreaseQuantity={() => handleIncreaseQuantity(product.itemId)}
          onDecreaseQuantity={() => handleDecreaseQuantity(product.itemId)}
          onRemove={() => handleRemove(product.itemId)}
        />
      ))}
    </ul>
  );
};
