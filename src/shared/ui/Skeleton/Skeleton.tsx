import { cn } from '@/shared/lib/utils';

export const Skeleton = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse bg-brand-surface-2', className)}
      {...props}
    />
  );
};
