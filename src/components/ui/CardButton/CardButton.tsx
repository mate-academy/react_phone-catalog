import React from 'react';
import classNames from 'classnames';
import styles from './CardButton.module.scss';

type CardButtonProps = {
  variant?: 'primary' | 'favorite' | 'control' | 'selected';
  modificator?: 'disabled' | 'borderNone';
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const CardButton: React.FC<CardButtonProps> = ({
  variant = 'primary',
  modificator,
  onClick,
  children,
  style,
}) => {
  return (
    <button
      className={classNames(styles.btn, {
        [styles['btn--primary']]: variant === 'primary',
        [styles['btn--favorite']]: variant === 'favorite',
        [styles['btn--control']]: variant === 'control',
        [styles['btn--selected']]: variant === 'selected',
        [styles['btn--borderNone']]: modificator === 'borderNone',
        [styles['btn--disabled']]: modificator === 'disabled',
      })}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
