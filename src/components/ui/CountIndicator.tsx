import { cn } from '@/lib/utils';

interface CountIndicatorProps {
  count: number;
  className?: string;
}

export const CountIndicator = ({ count, className }: CountIndicatorProps) => {
  if (count <= 0) return null;

  return (
    <span
      className={cn(
        'absolute -top-1.5 -right-1.5 z-10',
        'flex h-3 w-3 items-center justify-center rounded-full',
        'bg-[#ff4d4d] text-[7.5px] font-bold text-white',
        'ring-1 ring-white shadow-sm',
        'animate-in zoom-in duration-300',
        className,
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
};
