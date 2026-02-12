import React from 'react';
import { Product } from '../../../types/Product';
import styles from './SliderBtns.module.scss';

type Props = {
  products: Product[];
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export const SliderBtns: React.FC<Props> = ({ products, setCurrent }) => {
  const prevSlide = () => {
    setCurrent(prev => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent(prev => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.btns}>
      <button
        type="button"
        className={`${styles.btns__btn} ${styles['btns__btn--prev']}`}
        onClick={prevSlide}
      />
      <button
        type="button"
        className={`${styles.btns__btn} ${styles['btns__btn--next']}`}
        onClick={nextSlide}
      />
    </div>
  );
};
