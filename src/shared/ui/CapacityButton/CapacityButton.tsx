import Link from 'next/link';

import { cn } from '@/shared/lib';
import { BodyText } from '@/shared/ui/Typography';

interface CapacityButtonProps {
  capacity: string;
  href: string;
  isSelected?: boolean;
}

export const CapacityButton = ({
  capacity,
  isSelected,
  href,
}: CapacityButtonProps) => {
  return (
    <Link
      href={href}
      aria-current={isSelected ? 'true' : undefined}
      className={cn(
        'inline-flex items-center justify-center px-3 h-8 border transition-colors duration-300',
        isSelected
          ? 'border-brand-white bg-brand-white text-brand-black'
          : 'border-brand-icons bg-transparent text-brand-secondary hover:border-brand-white hover:text-brand-white',
      )}
    >
      <BodyText>{capacity}</BodyText>
    </Link>
  );
};
