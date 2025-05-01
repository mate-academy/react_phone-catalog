import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

type ButtonVariant = 'primary' | 'selected';

type Props = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  onClick = () => {},
  ...rest
}) => {
  return (
    <button
      className={classNames(styles['main-btn'], {
        [styles['main-btn--selected']]: variant === 'selected',
      })}
      onClick={onClick}
      {...rest}
    >
      <p className="main-text main-text--white">{children}</p>
    </button>
  );
};
