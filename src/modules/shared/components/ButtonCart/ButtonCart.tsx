import React from 'react';
import cn from 'classnames';
import styles from './ButtonCart.module.scss';

type Props = {
  inCart: boolean;
  onClick: () => void;
  size?: 'small' | 'large';
};

export const ButtonCart: React.FC<Props> = ({
  inCart,
  onClick,
  size = 'small',
}) => (
  <button
    className={cn(styles['button-cart'], styles[`button-cart--${size}`], {
      [styles['button-cart--active']]: inCart,
    })}
    onClick={onClick}
  >
    {inCart ? 'Added to cart' : 'Add to cart'}
  </button>
);
