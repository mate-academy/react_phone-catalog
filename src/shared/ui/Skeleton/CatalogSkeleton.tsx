import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export const ProductCardSkeleton = () => {
  return (
    <div className="relative box-border w-full min-h-126.5 flex flex-col justify-between p-8 bg-brand-surface-1 gap-1 h-full min-[508px]:h-126.5 min-[1200px]:w-68">
      <div className="w-full h-50 flex items-center justify-center overflow-hidden">
        <Skeleton className="h-50 w-full" />
      </div>

      <Skeleton className="h-14 w-4/5 mt-0" />

      <div className="flex items-center gap-2 mt-1">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-12" />
      </div>

      <div className="w-full h-px bg-brand-elements" />

      <div className="flex flex-col gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      <div className="flex gap-2 h-12">
        <Skeleton className="h-10 grow" />
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
  );
};

export const CatalogSkeleton = () => {
  return (
    <main className="mx-auto max-w-300 pb-20 bg-brand-black px-6 min-[508px]:px-6 lg:px-8">
      <nav className="flex items-center py-6">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 shrink-0" />
          <Skeleton className="h-4 w-4 shrink-0" />
          <Skeleton className="h-4 w-28" />
        </div>
      </nav>

      <div className="flex items-center pt-6">
        <Skeleton className="h-10 w-52" />
      </div>

      <div className="flex items-center pt-2">
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="flex gap-4 pt-8">
        <div className="min-w-34 flex-1 max-w-47 flex flex-col gap-1">
          <Skeleton className="h-4 w-14 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="min-w-34 flex flex-col gap-1">
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 pb-10 pt-6 min-[508px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
};
