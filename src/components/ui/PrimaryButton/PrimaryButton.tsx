import React, { ButtonHTMLAttributes } from 'react';
import styles from './PrimaryButton.module.scss';
import cn from 'classnames';

type Props = {
  isProductInCart?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton: React.FC<Props> = ({
  className,
  isProductInCart = false,
  children,
  onClick = () => {},
  type = 'button',
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      {...props}
      className={cn(
        styles.button,
        isProductInCart && styles.selected,
        className,
      )}
    >
      {children}
    </button>
  );
};
