import React from 'react';
import styles from './BoxButton.module.scss';
import cn from 'classnames';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  isBig?: boolean;
};

export const BoxButton: React.FC<Props> = ({
  children,
  isBig = false,
  isSelected = false,
  onClick = () => {},
}) => {
  const isDark = useTheme();

  return (
    <button
      type="button"
      className={cn(`${styles.btn}`, {
        [styles['btn--selected']]: isSelected,
        [styles['btn--big']]: isBig,
        [styles['btn--dark']]: isDark,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
