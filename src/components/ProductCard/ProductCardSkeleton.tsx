import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ProductCardSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="#e8e8e8"
      highlightColor="#f5f5f5"
    >
      <div className="relative flex flex-col gap-4 shrink-0 w-53.5 h-100 p-5 sm:w-68 sm:h-126.5 sm:p-8 rounded-xl border border-border bg-card">
        <div className="shrink-0 flex items-center justify-center w-43.5 h-46.25 sm:w-52 sm:h-65.75">
          <Skeleton
            width="100%"
            height="100%"
            borderRadius={8}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton
            width="75%"
            height={18}
          />
          <Skeleton
            width="50%"
            height={14}
          />

          <div className="flex items-baseline gap-2">
            <Skeleton
              width={60}
              height={22}
            />
            <Skeleton
              width={45}
              height={16}
            />
          </div>

          <Skeleton
            width={80}
            height={14}
          />
        </div>

        <div className="mt-auto flex gap-2 w-full">
          <Skeleton
            height={44}
            borderRadius={8}
            containerClassName="flex-1"
          />
          <Skeleton
            width={44}
            height={44}
            borderRadius={8}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
};
