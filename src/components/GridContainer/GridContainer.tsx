import React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const GridContainer: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-300',
        'px-4 md:px-6 lg:px-8',
        'grid grid-cols-4 md:grid-cols-12 lg:grid-cols-24 gap-x-4',
        'overflow-hidden',
        className,
      )}
    >
      {children}
    </div>
  );
};
