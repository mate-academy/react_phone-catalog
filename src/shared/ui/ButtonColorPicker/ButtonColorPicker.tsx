import Link from 'next/link';

import { cn } from '@/shared/lib';

interface ButtonColorPickerProps {
  color: string;
  href: string;
  isSelected?: boolean;
}

export const ButtonColorPicker = ({
  color,
  isSelected,
  href,
}: ButtonColorPickerProps) => {
  return (
    <Link
      href={href}
      aria-label={`Color: ${color}`}
      aria-current={isSelected ? 'true' : undefined}
      className={cn(
        'size-8 rounded-full block shrink-0 transition-all duration-300',
        isSelected
          ? 'shadow-[0_0_0_2px_var(--color-surface-1),0_0_0_4px_var(--color-white)]'
          : 'shadow-[0_0_0_2px_var(--color-surface-1),0_0_0_3px_var(--color-icons)] hover:shadow-[0_0_0_2px_var(--color-surface-1),0_0_0_3px_#75767F]',
      )}
      style={{ backgroundColor: `var(--color-product-${color})` }}
    />
  );
};
