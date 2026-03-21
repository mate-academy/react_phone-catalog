import React from 'react';
import styles from './ButtonPrimary.module.scss';
import cn from 'classnames';

interface Props {
  isSelected?: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
}

export const ButtonPrimary: React.FC<Props> = ({
  isSelected = false,
  onClick,
  className = '',
  children,
}) => {
  return (
    <button
      type="button"
      className={cn(styles.button, className, {
        [styles.buttonSelected]: isSelected,
      })}
      onClick={onClick}
    >
      {children || (isSelected ? 'Added' : 'Add to cart')}
    </button>
  );
};
