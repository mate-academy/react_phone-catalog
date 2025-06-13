/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';

import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../app/store';
import { addToCart } from '../../../../features/cart/cartSlice';
import {
  NormalizedProduct,
  normalizeProductType,
} from '../../../helpers/normalizeProductType';
import { Product } from '../../../types/Product';
import { ProductDetails } from '../../../types/ProductDetails';

import styles from './PrimaryButton.module.scss';

type Props = {
  variant?: 'add';
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
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(normalizeProductType(product)));
    }
  };

  const handleCheckout = () => {
    // Модальное окно
  };

  const isProductInCart = (prod: NormalizedProduct): boolean => {
    return cartItems.some(item => item.product.id === prod?.id);
  };

  const isAddToCart = variant === 'add';
  const handleClick = isAddToCart ? handleAddToCart : handleCheckout;
  let buttonLabel = '';

  if (variant === 'add' && product) {
    buttonLabel = isProductInCart(normalizeProductType(product))
      ? 'Added'
      : 'Add to cart';
  } else {
    buttonLabel = 'Checkout';
  }

  return (
    <button
      className={classNames(styles.primaryButton, sizeClass, {
        [styles.addedToCart]: buttonLabel === 'Added',
      })}
      onClick={handleClick}
    >
      {buttonLabel}
    </button>
  );
};
