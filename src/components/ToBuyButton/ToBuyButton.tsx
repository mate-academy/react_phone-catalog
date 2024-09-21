import React from 'react';
import styles from './ToBuyButton.module.scss';

type Props = {
  height: string;
};

export const ToBuyButton: React.FC<Props> = ({ height }) => {
  return (
    <button style={{ height: `${height}px` }} className={styles.toBuyButton}>
      Add to cart
    </button>
  );
};
