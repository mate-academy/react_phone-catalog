import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { ButtonSize } from './types/Buttons';

const buttonSizes: Record<ButtonSize, string> = {
  home: 'w-[126px] h-[40px] rounded-[8px] sm:w-[160px]',
  catalog: 'w-[200px] h-[40px] rounded-[8px] sm:w-[176px]',
  itemCard: 'w-[240px] h-[40px] rounded-[8px] sm:w-[219px] lg:w-[272px]',
  youMayLike: 'w-[127px] h-[40px] rounded-[8px]',
  cart: 'w-[242px] h-[48px] rounded-[8px] sm:w-[546px] lg:w-[320px]',
};

const buttonVariants = cva(
  'flex items-center justify-center font-medium text-center transition-colors duration-200',
  {
    variants: {
      state: {
        primary:
          'bg-primary text-primary-foreground hover:bg-popover hover:shadow-md',
        selected:
          'bg-primary text-primary-foreground border border-border hover:bg-popover hover:shadow-md',
      },
    },
    defaultVariants: {
      state: 'primary',
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  size: ButtonSize;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, state, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ state }), buttonSizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

CustomButton.displayName = 'Button';
