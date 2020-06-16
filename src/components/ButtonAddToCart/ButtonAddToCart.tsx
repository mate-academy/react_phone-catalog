import React, { useMemo } from 'react';
import './ButtonAddToCart.scss';
import cn from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import { getItems } from '../../store/index';
import { setCart, removeFromCart } from '../../store/cart';

type Props = {
  product: Product;
  ClassNameForBtn?: string | '';
};

const ButtonAddToCart: React.FC<Props> = ({ product, ClassNameForBtn }) => {
  const dispatch = useDispatch();
  const itemsCart = useSelector(getItems);

  const isInCart = useMemo(() => (
    itemsCart.some(itemCart => itemCart.product.id === product.id)
  ), [itemsCart, product]);

  const addToCart = (productCart: Product) => {
    if (!isInCart) {
      dispatch(setCart(productCart));
    } else {
      dispatch(removeFromCart(productCart));
    }
  };

  return (
    <button
      type="button"
      className={cn(`ButtonCart ${ClassNameForBtn}`, {
        'ButtonCart--isInCart': isInCart,
      })}
      onClick={() => addToCart(product)}
    >
      {!isInCart ? 'Add to cart' : 'Remove from cart'}
    </button>
  );
};

export default ButtonAddToCart;
