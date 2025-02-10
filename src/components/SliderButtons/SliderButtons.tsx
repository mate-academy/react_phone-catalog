import React, { useCallback } from 'react';
import { Product } from '../../types/Product';
import styles from './SliderButtons.module.scss';

interface Props {
  products: Product[];
  index: number;
  onIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const SliderButtons: React.FC<Props> = ({
  products,
  index,
  onIndex,
}) => {
  const handleLeftClick = useCallback(() => {
    onIndex(prev => (prev - 1 + products.length) % products.length);
  }, [products.length, onIndex]);

  const handleRightClick = useCallback(() => {
    onIndex(prev => (prev + 1) % products.length);
  }, [products.length, onIndex]);

  return (
    <div className={styles['slider-buttons__buttons']}>
      <button
        className={`${styles['slider-buttons__button']} ${styles['slider-buttons__button--left']}`}
        onClick={handleLeftClick}
        disabled={index === 0}
      ></button>
      <button
        className={`${styles['slider-buttons__button']} ${styles['slider-buttons__button--right']}`}
        onClick={handleRightClick}
      ></button>
    </div>
  );
};
