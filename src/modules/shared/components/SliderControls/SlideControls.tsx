import React from 'react';
import cn from 'classnames';
import styles from './SlideControls.module.scss';
import arrowLeft from '@/assets/icons/ArrowLeft.svg';
import arrowRight from '@/assets/icons/ArrowRight.svg';

interface Props {
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled?: boolean;
  isPrevDisabled?: boolean;
}

export const SlideControls: React.FC<Props> = ({
  onNext,
  onPrev,
  isNextDisabled = false,
  isPrevDisabled = false,
}) => {
  return (
    <div className={styles.controls}>
      <button
        type="button"
        aria-label="Previous slide"
        className={cn(styles.button, {
          [styles.buttonDisabled]: isPrevDisabled,
        })}
        onClick={onPrev}
        disabled={isPrevDisabled}
      >
        <img src={arrowLeft} alt="Previous slide" />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        className={cn(styles.button, {
          [styles.buttonDisabled]: isNextDisabled,
        })}
        onClick={onNext}
        disabled={isNextDisabled}
      >
        <img src={arrowRight} alt="Next slide" />
      </button>
    </div>
  );
};
