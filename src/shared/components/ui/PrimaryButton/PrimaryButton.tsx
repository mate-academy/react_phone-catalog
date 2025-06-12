/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import { useDispatch } from 'react-redux';

import { addToCart } from '../../../../features/cart/cartSlice';
import { normalizeProductType } from '../../../helpers/normalizeProductType';
import { Product } from '../../../types/Product';
import { ProductDetails } from '../../../types/ProductDetails';

import styles from './PrimaryButton.module.scss';

type Props = {
  variant: 'add' | 'checkout';
  product?: Product | ProductDetails;
  size?: 40 | 48;
};

export const PrimaryButton: React.FC<Props> = ({
  variant,
  product,
  size = 40,
}) => {
  const sizeClass = size === 40 ? styles.size40 : styles.size48;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(normalizeProductType(product)));
    }
  };

  const handleCheckout = () => {
    // Модальное окно
  };

  const isAddToCart = variant === 'add';
  const handleClick = isAddToCart ? handleAddToCart : handleCheckout;
  const buttonLabel = isAddToCart ? 'Add to cart' : 'Checkout';

  return (
    <button
      className={`${styles.primaryButton} ${sizeClass}`}
      onClick={handleClick}
    >
      {buttonLabel}
    </button>
  );
};
