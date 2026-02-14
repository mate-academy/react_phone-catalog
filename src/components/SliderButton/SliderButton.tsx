import React from 'react';

import styles from './SliderButton.module.scss';
const { sliderButton, sliderButton__wrapper, sliderButton__wrapper__left } =
  styles;
interface SliderButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export const SliderButton: React.FC<SliderButtonProps> = React.memo(
  ({ direction, onClick }) => {
    return (
      <button
        className={sliderButton}
        onClick={onClick}
        aria-label={`${direction} slide`}
      >
        <div
          className={`${sliderButton__wrapper} ${direction === 'left' && sliderButton__wrapper__left}`}
        >
          <img src={`${import.meta.env.BASE_URL}icons/icon-arrow.svg`} alt={`${direction} arrow`} />
        </div>
      </button>
    );
  },
);

SliderButton.displayName = 'SliderButton';
