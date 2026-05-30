import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';
import { useAppSelector } from '@store/hooks';
import { Theme } from '@sTypes/Theme';

type Props = {
  active?: boolean;
  className?: string;

  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({
  active,
  className,

  children,

  ...props
}) => {
  const theme = useAppSelector(state => state.theme);

  return (
    <button
      {...props}
      className={classNames(className, styles.button, {
        [styles['button--selected']]: active,
        [styles['button--dark']]: theme === Theme.dark,
      })}
    >
      {children}
    </button>
  );
};
