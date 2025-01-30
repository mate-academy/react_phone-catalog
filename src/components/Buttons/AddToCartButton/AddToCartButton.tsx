import React, { useCallback } from 'react';
import { Button } from '..';
import './AddToCartButton.scss';
import { ActionTypes } from '../../../enums';
import { useStateContext } from '../../../state/state';
import { Product } from '../../../types';

type Props = {
  product: Product;
  isInCart?: boolean;
  children: React.ReactNode;
};

export const AddToCartButton: React.FC<Props> = React.memo(
  ({ product, isInCart = false, children }) => {
    const { dispatch } = useStateContext();

    const handleAddToCart = useCallback(() => {
      if (isInCart) {
        dispatch({
          type: ActionTypes.REMOVE_FROM_CART,
          payload: product.itemId,
        });
      } else {
        dispatch({ type: ActionTypes.ADD_TO_CART, payload: product });
      }
    }, [dispatch, product, isInCart]);

    return (
      <Button
        onClick={handleAddToCart}
        selected={isInCart}
        className="add-to-cart-button typography__button-text"
      >
        {children}
      </Button>
    );
  },
);

AddToCartButton.displayName = 'AddToCartButton';
