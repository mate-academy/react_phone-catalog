import React from 'react';
import classNames from 'classnames';
import { useDispatch, useGlobalState } from '../../hooks/hooks';
import { Product } from '../../types/Product';
import './ToCartButton.scss';

type Props = {
  product: Product;
};

export const ToCartButton: React.FC<Props> = React.memo(({ product }) => {
  const dispatch = useDispatch();
  const { cart } = useGlobalState();

  const isInCart = cart.some(item => item.itemId === product.itemId);

  const handleToggleCart = () => {
    return isInCart
      ? dispatch({ type: 'deleteFromCart', payload: product.itemId })
      : dispatch({ type: 'addToCart', payload: product });
  };

  return (
    <button
      type="button"
      className={classNames('to-cart', { 'to-cart--delete': isInCart })}
      onClick={handleToggleCart}
    >
      {isInCart ? <p>Added</p> : <p>Add to cart</p>}
    </button>
  );
});

ToCartButton.displayName = 'ToCartButton';
