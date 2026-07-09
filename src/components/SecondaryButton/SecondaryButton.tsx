import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './SecondaryButton.module.scss';
import classNames from 'classnames';

type ButtonSize = 's' | 'm' | 'l';

type Props = {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  size?: ButtonSize;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const SecondaryButton: React.FC<Props> = ({
  children,
  className = '',
  isActive = false,
  size = 's',
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={classNames(
        styles.button,
        styles[size],
        {
          [styles.active]: isActive,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
