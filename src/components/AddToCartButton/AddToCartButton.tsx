import React from 'react';
import styles from './AddToCartButton.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { RootState } from '../../store';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
};

export const AddToCartButton: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const isInCart = cart.some(item => item.product.id === product.id);

  return (
    <button
      className={isInCart ? styles.added : styles.button}
      onClick={() => {
        if (!isInCart) {
          dispatch(addToCart(product));
        }
      }}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
