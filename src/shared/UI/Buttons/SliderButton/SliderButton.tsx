import React from 'react';
import styles from './SliderButton.module.scss';
import cn from 'classnames';

interface Props {
  onClick: () => void;
  disabled: boolean;
  direction: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const SliderButton: React.FC<Props> = ({
  onClick,
  disabled,
  direction,
  className,
}) => {
  const directionClass = () => {
    switch (direction) {
      case 'up':
        return styles.button__up;
      case 'down':
        return styles.button__down;
      case 'left':
        return styles.button__left;
      default:
        return styles.button__right;
    }
  };

  const buttonStyles = cn(className, styles.button, directionClass(), {
    [styles.button__disabled]: disabled,
  });
  return (
    <button onClick={onClick} disabled={disabled} className={buttonStyles}>
      <span className={styles.button__arrow}></span>
    </button>
  );
};
