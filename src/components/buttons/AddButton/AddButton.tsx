import React, { useContext } from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../../../GlobalContext';
import classes from './AddButton.module.scss';

type Props = {
  id: string;
  bigButton?: boolean;
};

export const AddButton: React.FC<Props> = ({ id, bigButton }) => {
  const { cart, dispatch, products } = useContext(GlobalContext);
  const product = products.find(item => item.itemId === id);

  const isProductInCart = cart.some(item => item.id === product?.id);

  const addToCart = () => {
    const index = cart.findIndex(item => item.id === product?.id);

    if (product) {
      if (index === -1) {
        dispatch({ type: 'ADD_TO_CART', payload: { ...product, amount: 1 } });
      } else {
        dispatch({
          type: 'DELETE_FROM_CART',
          payload: { ...product, amount: 1 },
        });
      }
    }
  };

  return (
    <button
      className={classNames(classes.AddButton, {
        [classes['AddButton--big']]: bigButton,
        [classes['AddButton--inCart']]: isProductInCart,
      })}
      type="button"
      onClick={addToCart}
    >
      {isProductInCart ? 'Added' : 'Add to cart'}
    </button>
  );
};
