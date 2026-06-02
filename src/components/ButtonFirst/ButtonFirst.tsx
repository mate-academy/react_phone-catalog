import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

export const ButtonFirst = ({ children, selected = false, className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={classNames(className, styles.button, { [styles.selected]: selected })}
    >
      {children}
    </button>
  );
};
