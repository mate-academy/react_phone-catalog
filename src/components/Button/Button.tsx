import React from 'react';
import styles from './Button.module.scss';
import { ButtonType } from '../../types/ButtonType';
import classNames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ButtonType;
  iconActive?: ButtonType;
  disabled?: boolean;
  isDisabled?: boolean;
  isFavorite?: boolean;
  isRatio?: boolean;
  isSelected?: boolean;
  isPage?: boolean;
  isCircle?: boolean;
  isCapacity?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Button = ({
  icon,
  iconActive,
  disabled = false,
  isDisabled = false,
  isRatio = false,
  isSelected = false,
  isFavorite = false,
  isPage = false,
  isCircle = false,
  isCapacity = false,
  className = '',
  children,
  ...props
}: Props) => {
  const currentIcon = isSelected && iconActive ? iconActive : icon;

  return (
    <button
      type="button"
      disabled={disabled}
      className={classNames(className, styles.button, {
        [styles.button__disabled]: isDisabled || (isFavorite && isSelected),
        [styles.primary]: !isRatio && !icon,
        [styles.heart]: isFavorite,
        [styles.ratio]: isRatio,
        [styles.selected]: isSelected,
        [styles.page]: isPage && !disabled,
        [styles.circle]: isCircle,
        [styles.capacity]: isCapacity,

        [styles['page--dots']]: isPage && disabled,
      })}
      {...props}
    >
      {icon ? <span className={`icon icon--${currentIcon}`} /> : children}
    </button>
  );
};
