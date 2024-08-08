import React from 'react';
import classNames from 'classnames';
import styles from './CardButton.module.scss';

type CardButtonProps = {
  variant?: 'primary' | 'favorite';
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const CardButton: React.FC<CardButtonProps> = ({
  variant = 'primary',
  onClick,
  children,
  style,
}) => {
  return (
    <button
      className={classNames(styles.btn, {
        [styles['primary-btn']]: variant === 'primary',
        [styles['favorite-btn']]: variant === 'favorite',
      })}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
