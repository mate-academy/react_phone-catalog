import React from 'react';
import styles from './ButtonPrimary.module.scss';
import cn from 'classnames';

interface Props {
  isSelected?: boolean;
  onClick?: () => void;
}

export const ButtonPrimary: React.FC<Props> = ({
  isSelected = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={cn(styles.button, {
        [styles.buttonSelected]: isSelected,
      })}
      onClick={onClick}
    >
      {isSelected ? 'Added' : 'Add to cart'}
    </button>
  );
};
