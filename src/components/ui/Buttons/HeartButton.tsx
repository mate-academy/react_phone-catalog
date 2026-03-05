import React from 'react';
import { Icon } from '../icons';
import { cn } from '@/lib/utils';

interface HeartButtonProps {
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

export const HeartButton: React.FC<HeartButtonProps> = ({
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
        name="heart"
        size="sm"
        state={isSelected ? 'selected' : 'default'}
        className="w-5 h-5"
      />
    </button>
  );
};
