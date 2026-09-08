import cn from 'classnames';
import styles from './SquareButton.module.scss';
import React from 'react';
import { useTheme } from '../../../../hooks/useTheme';

type Props = {
  isActive: boolean;
  text: string;
};

function addSpace(item: string) {
  const value = parseFloat(item);
  const size = item.replace(`${value}`, '');

  return `${value} ${size}`;
}

export const SquareButton: React.FC<Props> = ({ isActive, text }) => {
  const isDark = useTheme();

  return (
    <button
      className={cn(styles.btn, {
        [styles['btn--active']]: isActive,
        [styles['btn--dark']]: isDark,
      })}
    >
      {addSpace(text)}
    </button>
  );
};
