import React, { useCallback } from 'react';
import { ProductType } from '../../types/ProductType';
import { useStateContext } from '../../state/state';
import { ActionTypes } from '../../enums/ActionTypes';
import { Button } from '../Button/Button';
import style from './AddCartButton.module.scss';

interface Props {
  product: ProductType;
  isInCart?: boolean;
  children: React.ReactNode;
}

export const AddCartButton: React.FC<Props> = React.memo(
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
        className={style.add_to_cart_button}
      >
        {children}
      </Button>
    );
  },
);

AddCartButton.displayName = 'AddCartButton';
