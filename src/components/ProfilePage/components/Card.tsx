import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div
    className={cn(
      'bg-card rounded-2xl border border-border p-6 md:p-8',
      className,
    )}
  >
    {children}
  </div>
);
