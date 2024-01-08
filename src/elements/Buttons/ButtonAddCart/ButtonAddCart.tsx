import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ProductType } from '../../../helpers/types/ProductType';
import { useAppSelector } from '../../../store/hooks';
import { addToCart, removeFromCart } from '../../../features/cartSlice';
import {
  setCartModal,
} from '../../../features/modalSlice';
import './ButtonAddCart.scss';

type Props = {
  product: ProductType;
};

export const ButtonAddCart: React.FC<Props> = ({
  product,
}) => {
  const dispatch = useDispatch();
  const { cartedProducts } = useAppSelector(state => state.cart);

  function isProductCarted() {
    const copy = Array.from(cartedProducts);

    return copy.map(car => JSON.stringify(car))
      .includes(JSON.stringify(product));
  }

  function onClick(prod: ProductType) {
    if (isProductCarted()) {
      dispatch(removeFromCart(prod.id));
    } else {
      dispatch(addToCart(prod));
      dispatch(setCartModal());
    }
  }

  return (
    <button
      type="button"
      aria-label="button"
      onClick={() => onClick(product)}
      className={classNames('buttonAddCart', {
        'buttonAddCart--active': isProductCarted(),
      })}
    >

      <p className={classNames('buttonAddCart__text', {
        'buttonAddCart__text-active': isProductCarted(),
      })}
      >
        {isProductCarted() ? 'Added to cart' : 'Add to cart'}
      </p>
    </button>
  );
};
