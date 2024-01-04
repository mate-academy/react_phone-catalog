import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ProductType } from '../../helpers/types/ProductType';
import './ButtonTexted.scss';
import { useAppSelector } from '../../store/hooks';
import { addToCart, removeFromCart } from '../../features/cartSlice';
import {
  setCartModal,
  // showCartModal,
} from '../../features/modalSlice';

type Props = {
  product: ProductType;
  text: 'Add to cart' | 'Checkout' | '64 GB' | '256 GB' | '512 GB';
  textActive?: 'Added to cart'
  width?: string;
};

export const ButtonTexted: React.FC<Props> = ({
  product,
  text,
  textActive,
  width,
}) => {
  const dispatch = useDispatch();
  const cartedProducts = useAppSelector(state => state.cartedProducts);

  function isProductCarted() {
    // const copy = [...cartedProducts];
    const copy = Array.from(cartedProducts);

    return copy.map(car => JSON.stringify(car))
      .includes(JSON.stringify(product));
  }

  function handleCartClick(prod: ProductType) {
    if (isProductCarted()) {
      dispatch(removeFromCart(prod.id));
    } else {
      dispatch(addToCart(prod));
      dispatch(setCartModal());
      // showCartModal();
    }
  }

  return (
    <button
      type="button"
      aria-label="button"
      onClick={() => handleCartClick(product)}
      className={classNames('buttonTexted', {
        'buttonTexted--active': isProductCarted(),
        [`buttonTexted--${width}`]: width,
      })}
    >

      <p className={classNames('buttonTexted__text', {
        'buttonTexted__text-active': isProductCarted(),
      })}
      >
        {(isProductCarted() && textActive) ? textActive : text}
      </p>
    </button>
  );
};
