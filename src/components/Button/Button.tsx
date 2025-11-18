import { forwardRef } from 'react';
import './Button.scss';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, children }, ref) => {
    return (
      <button className={className} ref={ref}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
