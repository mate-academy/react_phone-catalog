import React from 'react';
import classNames from 'classnames';
import style from './Button.module.scss';

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = React.memo(
  ({
    onClick,
    disabled = false,
    selected = false,
    children,
    className,
    ...props
  }) => {
    const buttonClass = classNames(style.button, className, {
      [style.button_disabled]: disabled,
      [style.button_selected]: selected,
    });

    return (
      <button
        className={buttonClass}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
    Button.displayName = 'Button';
  },
);
