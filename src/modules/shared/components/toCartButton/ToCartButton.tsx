import React from 'react';
import styles from './ToCartButton.module.scss';
import { AppButton } from '../appButton';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Products } from '../../../../types/Products';
import { addProductToCart } from '../../../../features/cartSlice/cart';

type MoreProps = {
  product: Products;
};

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & MoreProps;

export const ToCartButton: React.FC<Props> = ({ product, ...props }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(s => s.cart);
  const productInCart = cart.some(p => p.id === product.id);

  const text = productInCart ? 'Added to cart' : 'Add to cart';

  const onClickButton = productInCart
    ? () => {}
    : () => dispatch(addProductToCart(product));

  const className = productInCart
    ? `${styles.toCartButton} ${styles.active}`
    : styles.toCartButton;

  return (
    <AppButton
      {...props}
      className={className}
      buttonName={text}
      onClick={onClickButton}
    />
  );
};
