import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export const ItemCardPageSkeleton = () => {
  return (
    <main className="w-full pt-6">
      <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center py-0 mb-10">
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 shrink-0" />
            <Skeleton className="h-4 w-4 shrink-0" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4 shrink-0" />
            <Skeleton className="h-4 w-52" />
          </div>
        </nav>

        <Skeleton className="h-5 w-14 mb-4" />

        <Skeleton className="h-10 w-2/3 mb-8" />

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-116 w-full sm:flex-1" />
            <div className="flex flex-row gap-2 sm:flex-col">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 w-20 shrink-0" />
              ))}
            </div>
          </div>

          <div className="flex max-w-sm flex-col gap-6">
            <div>
              <div className="flex justify-between mb-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>
              <div className="flex items-center gap-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded-full" />
                ))}
              </div>
            </div>

            <div className="h-px bg-brand-elements" />

            <div>
              <Skeleton className="h-4 w-28 mb-3" />
              <div className="flex flex-wrap gap-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-9 w-16" />
                ))}
              </div>
            </div>

            <div className="h-px bg-brand-elements" />

            <div className="flex items-baseline gap-3">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-7 w-16" />
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-12" />
            </div>

            <div className="space-y-2">
              {['Screen', 'Resolution', 'Processor', 'RAM'].map((label) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-4"
                >
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <section>
            <Skeleton className="h-6 w-16 mb-4" />
            <div className="mb-8 h-px bg-brand-elements" />
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="h-5 w-48 mb-4" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="mb-8 h-px bg-brand-elements" />
            <div className="space-y-3">
              {[
                'Screen',
                'Resolution',
                'Processor',
                'RAM',
                'Camera',
                'Zoom',
                'Cell',
              ].map((label) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-4"
                >
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-36" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
