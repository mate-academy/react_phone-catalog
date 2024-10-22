import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';
import { Product } from '../../types/Product';

type Props = {
  text?: string;
  addedToCart?: Product;
};

export const Button: React.FC<Props> = ({ text, addedToCart }) => {
  return (
    <>
      <div
        className={classNames(styles.button, 'text-buttons', {
          [styles.button__disabled]: addedToCart,
        })}
      >
        {addedToCart ? 'Added to cart' : text}
      </div>
    </>
  );
};
