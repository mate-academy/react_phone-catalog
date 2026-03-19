import type { FC } from 'react';
import cn from 'clsx';
import { Skeleton } from './Skeleton';

interface Props {
  className?: string;
}

export const ProductCardSkeleton: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'shadow-elements dark:bg-d-surface1 dark:hover:shadow-d-surface2 flex h-full flex-col gap-2 p-8 shadow-inner transition dark:shadow-none dark:hover:shadow-inner',
        className,
      )}
    >
      {/* Image Skeleton */}
      <div className="flex flex-[1_1_auto]">
        <Skeleton className="bg-elements dark:bg-d-elements aspect-square w-full flex-[1_1_auto]" />
      </div>

      {/* Title Skeleton */}
      <div className="mt-4 flex-[0_0_auto]">
        {/*<Skeleton className="bg-elements dark:bg-d-elements h-6 w-full" />*/}
        <Skeleton className="bg-elements dark:bg-d-elements h-6 w-3/4" />
      </div>

      {/* Price Skeleton */}
      <div className="mt-2 flex flex-[0_0_auto] items-center gap-2">
        <Skeleton className="bg-elements dark:bg-d-elements h-8 w-16" />
        <Skeleton className="bg-elements dark:bg-d-elements ml-2 h-6 w-12" />
      </div>

      {/* Divider */}
      <div className="bg-elements dark:bg-d-elements h-px flex-[0_0_auto]"></div>

      {/* Specs Skeleton */}
      <ul className="flex flex-[0_0_auto] flex-col gap-2 py-2">
        {[1, 2, 3].map(i => (
          <li key={i} className="flex items-center justify-between">
            <Skeleton className="bg-elements dark:bg-d-elements h-4 w-16" />
            <Skeleton className="bg-elements dark:bg-d-elements h-4 w-12" />
          </li>
        ))}
      </ul>

      {/* Buttons Skeleton */}
      <div className="flex flex-[0_0_auto] gap-2">
        <Skeleton className="bg-elements dark:bg-d-elements h-10 w-full flex-[1_1_auto]" />
        <Skeleton className="bg-elements dark:bg-d-elements aspect-square size-10 flex-[0_0_auto]" />
      </div>
    </div>
  );
};
