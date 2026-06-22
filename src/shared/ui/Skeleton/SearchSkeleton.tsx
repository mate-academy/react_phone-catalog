import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export const SearchSkeleton = () => {
  return (
    <main className="pt-20 px-6 max-w-300 mx-auto">
      <Skeleton className="h-10 w-72" />
      <div className="flex flex-col gap-4 mt-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-4 max-w-200 bg-brand-surface-1"
          >
            <Skeleton className="h-5 w-20" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="size-4" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
