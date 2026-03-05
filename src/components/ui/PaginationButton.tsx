import React from 'react';
import { cn } from '@/lib/utils';

export interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: React.ReactNode;
}

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  selected = false,
  children,
  className,
  ...props
}) => {
  const baseClasses =
    'w-8 h-8 rounded-lg flex items-center justify-center text-center font-medium text-sm transition-colors duration-200';

  const selectedClasses =
    selected ?
      'bg-black border border-black text-white'
    : 'bg-white border border-gray-300 text-black hover:border-black';

  return (
    <button
      className={cn(baseClasses, selectedClasses, className)}
      {...props}
    >
      {children}
    </button>
  );
};
