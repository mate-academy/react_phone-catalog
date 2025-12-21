import { forwardRef, ReactNode } from 'react';
import './Button.scss';
import classNames from 'classnames';

type Props = {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button';
  children?: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, disabled, onClick, type = 'button', children }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={classNames('button', className)}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
