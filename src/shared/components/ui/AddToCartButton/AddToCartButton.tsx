/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { useDispatch } from 'react-redux';

import { addToCart } from '../../../../features/cart/cartSlice';
import { normalizeProductType } from '../../../../shared/helpers/normalizeProductType';
import { Product } from '../../../../shared/types/Product';
import { ProductDetails } from '../../../../shared/types/ProductDetails';

import styles from './AddToCartButton.module.scss';

type Props = {
  product: Product | ProductDetails;
  size?: 40 | 48;
};

export const AddToCartButton: React.FC<Props> = ({ product, size = 40 }) => {
  const sizeClass = size === 40 ? styles.size40 : styles.size48;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(normalizeProductType(product)));
  };

  return (
    <button
      className={`${styles.addToCart} ${sizeClass}`}
      onClick={handleAddToCart}
    >
      Add to cart
    </button>
  );
};
