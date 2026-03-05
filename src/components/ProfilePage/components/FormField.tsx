import React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  rightElement?: React.ReactNode;
}

export const FormField = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  disabled,
  rightElement,
}: FormFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        disabled={disabled}
        className={cn(
          'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground',
          'placeholder:text-muted-foreground focus:outline-none focus:ring-2',
          'focus:ring-primary/20 focus:border-primary transition-all duration-200',
          disabled && 'opacity-50 cursor-not-allowed bg-muted',
          rightElement && 'pr-12',
        )}
      />
      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  </div>
);
