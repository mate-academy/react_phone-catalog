import { ReactNode } from 'react';
import cn from 'clsx';

export interface ToggleOption<T extends string> {
  label: ReactNode;
  value: T;
}

interface Props<T extends string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
}

export const Toggle = <T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: Props<T>) => {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'bg-elements dark:bg-d-surface2 flex w-max items-center p-0.5',
        className,
      )}
    >
      {options.map(option => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            title={typeof option.label === 'string' ? option.label : undefined}
            className={cn(
              'text-buttons relative px-3 py-1 transition',
              isActive
                ? 'text-primary dark:bg-d-icons dark:text-d-white bg-white shadow-sm'
                : 'text-secondary hover:text-primary dark:text-d-secondary dark:hover:text-d-white',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
