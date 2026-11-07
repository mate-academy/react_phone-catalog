import type React from 'react';
import cn from 'classnames';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  className?: string;
};

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-secondary font-medium">{label}</label>
      <input
        {...props}
        className={cn(
          'px-3 py-2 rounded-lg bg-hover-bg dark:bg-surface-2-dark border',
          {
            'border-red': error,
            'border-elements dark:border-secondary/30': !error,
          },
          'text-primary dark:text-white text-sm focus:outline-none focus:border-primary dark:focus:border-white transition-colors',
          className,
        )}
      />
      {error && <span className="text-xs text-red">{error}</span>}
    </div>
  );
};
