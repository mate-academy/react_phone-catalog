import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SKELETON_THEME } from '../constants/skeletonTheme';

export const CartSummarySkeleton = () => {
  return (
    <SkeletonTheme {...SKELETON_THEME}>
      <div className="w-full lg:max-w-92 rounded-2xl border border-border bg-card p-6 flex flex-col lg:shrink-0 gap-4 items-center text-center">
        <Skeleton
          width={120}
          height={36}
        />

        <Skeleton
          width={140}
          height={16}
        />

        <div className="w-full border-t border-border" />

        <Skeleton
          height={48}
          borderRadius={8}
          containerClassName="w-full"
        />
      </div>
    </SkeletonTheme>
  );
};
