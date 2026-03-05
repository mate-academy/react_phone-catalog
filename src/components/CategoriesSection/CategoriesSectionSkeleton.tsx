import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { TYPOGRAPHY } from '@/constants/typography.ts';
import { cn } from '@/lib/utils.ts';

export const CategoriesSectionSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="#e8e8e8"
      highlightColor="#f5f5f5"
    >
      <section className="flex flex-col mt-[56px] px-4 gap-6 min-[640px]:mt-[56px] min-[640px]:px-6 min-[1200px]:mt-[80px] min-[1200px]:w-[1136px] min-[1200px]:mx-auto min-[1200px]:px-0">
        <h2 className={cn(TYPOGRAPHY.h2, 'text-foreground')}>
          Shop by category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <div key={i}>
                <Skeleton
                  className="w-full aspect-[4/3]"
                  height={240}
                  borderRadius={16}
                />
                <Skeleton
                  width="60%"
                  height={20}
                  style={{ marginTop: '16px' }}
                />
              </div>
            ))}
        </div>
      </section>
    </SkeletonTheme>
  );
};
