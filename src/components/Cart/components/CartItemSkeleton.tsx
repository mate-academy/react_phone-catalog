import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SKELETON_THEME } from '../constants/skeletonTheme';

export const CartItemSkeleton = () => {
  return (
    <SkeletonTheme {...SKELETON_THEME}>
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Skeleton
            width={16}
            height={16}
            borderRadius={4}
          />

          <Skeleton
            width={48}
            height={80}
            borderRadius={6}
          />

          <div className="flex flex-col gap-1.5 min-w-0">
            <Skeleton
              width={160}
              height={16}
            />
            <Skeleton
              width={100}
              height={13}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <Skeleton
              width={32}
              height={32}
              circle
            />
            <Skeleton
              width={20}
              height={16}
            />
            <Skeleton
              width={32}
              height={32}
              circle
            />
          </div>

          <Skeleton
            width={80}
            height={22}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};
