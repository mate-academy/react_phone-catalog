import type { FC } from 'react';
import styles from './AddToCartButton.module.scss';

type Props = {
  onClick: () => void;
  inCart: boolean;
};

export const AddToCartButton: FC<Props> = ({ onClick, inCart }) => {
  return (
    <button
      className={inCart ? styles.added : styles.button}
      onClick={onClick}
    >
      {inCart ? 'Added' : 'Add to cart'}
    </button>
  );
};

// return <button className={styles.addToCartButton}>AddToCartButton</button>;
