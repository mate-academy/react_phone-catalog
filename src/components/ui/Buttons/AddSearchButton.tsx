import React from 'react';
import { Icon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface AddSearchButtonProps {
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

export const AddSearchButton: React.FC<AddSearchButtonProps> = ({
  onClick,
  isSelected = false,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'p-2 rounded-lg border border-border hover:border-foreground dark:border-white/20 dark:hover:border-white/40 transition-all',
        className,
      )}
      aria-label="Add to favorite"
    >
      <Icon
        name={isSelected ? 'check' : 'shoppingBag'}
        size="sm"
        className="w-5 h-5"
      />
    </button>
  );
};
