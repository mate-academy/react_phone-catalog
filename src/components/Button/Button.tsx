import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isSelected?: boolean;
}

export const Button = ({
  variant = 'primary',
  isSelected = false,
  className,
  type = 'button',
  ...rest
}: Props) => (
  <button
    type={type}
    className={classNames(
      styles.button,
      styles[`button--${variant}`],
      { [styles['button--selected']]: isSelected },
      className,
    )}
    {...rest}
  />
);
