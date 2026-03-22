import React from 'react';
import cn from 'classnames';
import styles from './SlideControls.module.scss';
import ArrowLeft from '@/assets/icons/ArrowLeft.svg?react';
import ArrowRight from '@/assets/icons/ArrowRight.svg?react';

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
        <ArrowLeft title="Previous slide" aria-label="Previous slide" />
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
        <ArrowRight title="Next slide" aria-label="Next slide" />
      </button>
    </div>
  );
};
