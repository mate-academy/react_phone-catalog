import React, { memo } from 'react';
import './Button.scss';
import classNames from 'classnames';

type Props = {
  shape?: 'rectangular' | 'round';
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = memo(
  ({
    shape = 'rectangular',
    onClick,
    disabled = false,
    selected = false,
    children,
    className,
    ...props
  }) => {
    const buttonClass = classNames('button', className, {
      [`button--${shape}`]: shape,
      'button--disabled': disabled,
      'button--selected': selected,
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
