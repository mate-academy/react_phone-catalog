import React, { useMemo } from 'react';
import './Buttons.scss';
import cn from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import { getCart } from '../../store/index';
import { setToCart, deleteFromCart } from '../../store/cart';

type Props = {
  good: Good;
  ClassNameForBtn?: string | '';
};

const ButtonAddToCart: React.FC<Props> = ({ good, ClassNameForBtn }) => {
  const dispatch = useDispatch();
  const itemsCart = useSelector(getCart);

  const isInCart = useMemo(() => (
    itemsCart.some(itemCart => itemCart.good.id === good.id)
  ), [itemsCart, good]);

  const addToCart = (goodCart: Good) => {
    if (!isInCart) {
      dispatch(setToCart(goodCart));
    } else {
      dispatch(deleteFromCart(goodCart));
    }
  };

  return (
    <button
      type="button"
      className={cn(`ButtonCart ${ClassNameForBtn}`, {
        'ButtonCart--isInCart': isInCart,
      })}
      onClick={() => addToCart(good)}
    >
      {!isInCart ? 'Add to cart' : 'Remove from cart'}
    </button>
  );
};

export default ButtonAddToCart;
