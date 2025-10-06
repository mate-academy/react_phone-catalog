import React from "react";
import styles from './ProductSliderButtons.module.scss';
import arrowLeft from '../../../../shared/images/slider/slider-arrow-left.png';
import arrowRight from '../../../../shared/images/slider/slider-arrow-right.png';

type Props = {
  length: number;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const ProductSliderButtons: React.FC<Props> = ({
  length,
  index,
  setIndex,
}) => {
  const handleNext = () => {
    if (index < length - 1) {
      setIndex(prev => prev + 1);
    } else {
      setIndex(0);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
    } else {
      setIndex(length - 1);
    }
  };

  return (
    <div className={styles.buttons}>
      <div className={styles.button} onClick={handlePrev}>
        <img src={arrowLeft} alt="" className={styles.icon} />
      </div>
      <div className={styles.button} onClick={handleNext}>
        <img src={arrowRight} alt="" className={styles.icon} />
      </div>
    </div>
  );
};
