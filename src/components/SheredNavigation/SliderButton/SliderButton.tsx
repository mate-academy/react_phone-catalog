import React from 'react';
import classNames from 'classnames';

import styles from './SliderButton.module.scss';

type Props = {
  direction?: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'tall' | 'round';
};

export const SliderButton: React.FC<Props> = ({
  direction = 'right',
  onClick,
  disabled = false,
  className,
  variant = 'tall',
}) => {
  return (
    <button
      className={classNames(
        styles.sliderButton,
        styles[`sliderButton--${direction}`],
        styles[`sliderButton--${variant}`],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Scroll ${direction}`}
    >
      <span className={styles.icon}>{direction === 'left' ? '<' : '>'}</span>
    </button>
  );
};
