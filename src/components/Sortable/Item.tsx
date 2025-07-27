import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);
Item.displayName = 'Item';
