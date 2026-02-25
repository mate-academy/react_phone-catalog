import React from 'react';
import styles from './PrimaryButton.module.scss';
import cn from 'classnames';

interface Props {
  children: React.ReactNode;
  active?: boolean;
  classNames?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({
  children,
  active,
  classNames,
  onClick,
  type = 'button',
  disabled,
}) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={cn(styles.button, classNames, { [styles.active]: active })}
  >
    {children}
  </button>
);
