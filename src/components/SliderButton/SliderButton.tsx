import React from 'react';
import classNames from 'classnames';
import styles from './SliderButton.module.scss';

type Props = {
  direction: 'prev' | 'next';
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

export const SliderButton: React.FC<Props> = ({
  direction,
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button
      className={classNames(styles.sliderButton, className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      data-direction={direction}
    />
  );
}; 