import React, { useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';

import './AddToCart.scss';
import { FavAndCartContext } from '../context/FavAndCartContext';
import { CartType } from '../../types/CartType';

type Props = {
  product: CartType,
};

export const AddToCart: React.FC<Props> = ({ product }) => {
  const { cart, setCart } = useContext(FavAndCartContext);

  const isAdded = useMemo(() => (
    cart.some(item => item.phoneId === product.phoneId)
  ), [cart, product]);

  const handleBtnClick = useCallback(() => {
    if (isAdded) {
      return setCart(cart.filter(item => (
        item.phoneId !== product.phoneId
      )));
    }

    return setCart([
      ...cart,
      product,
    ]);
  }, [cart]);

  return (
    <button
      type="button"
      className={classNames('add-cart', {
        'add-cart--active': isAdded,
      })}
      onClick={handleBtnClick}
    >
      {isAdded ? (
        'Added to cart'
      ) : (
        'Add to cart'
      )}
    </button>
  );
};
