/* eslint-disable react/display-name */
import classNames from 'classnames';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import cls from './button.module.scss';

export enum ButtonSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
  FULL = 'full',
}

export enum ButtonTheme {
  DEFAULT = 'default',
  SQUARE = 'square',
  SQUARE_FAV = 'square_fav',
  SQUARE_DEFAULT = 'square_default',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  cirlce?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  selected?: boolean;
  children?: ReactNode;
  // | FunctionComponent<SVGProps<SVGElement>>
}

export const Button = memo((props: ButtonProps) => {
  const {
    children,
    className,
    theme = ButtonTheme.DEFAULT,
    type = 'button',
    size = ButtonSize.S,
    cirlce,
    disabled,
    selected,
    ...otherProps
  } = props;

  return (
    <button
      type={type}
      className={classNames(
        className,
        cls.button,
        {
          [cls.selected]: selected,
        },
        [cls[theme], cls[size]],
      )}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
