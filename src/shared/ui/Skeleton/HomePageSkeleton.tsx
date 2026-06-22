import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export const ProductsSliderSkeleton = () => {
  return (
    <section className="mx-auto w-full max-w-300 px-4 md:px-8">
      <div className="mb-6 flex items-end justify-between">
        <Skeleton className="h-8 w-64" />
        <div className="flex gap-3">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>

      <div className="flex gap-4 overflow-hidden md:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-53 md:w-59.25 lg:w-68 shrink-0 flex flex-col justify-between p-8 bg-brand-surface-1 gap-1 min-h-126.5"
          >
            <Skeleton className="h-50 w-full" />
            <Skeleton className="h-14 w-4/5" />
            <div className="flex items-center gap-2 mt-1">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-12" />
            </div>
            <div className="w-full h-px bg-brand-elements" />
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex justify-between">
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
        ))}
      </div>
    </section>
  );
};

export const ShopByCategorySkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-300 px-4 md:px-8">
      <section className="w-full">
        <Skeleton className="h-8 w-52 mb-6" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="mb-6 aspect-square w-full" />
              <Skeleton className="h-5 w-36 mb-1" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const PromoSliderSkeleton = () => {
  return (
    <section className="mx-auto w-full max-w-300 px-4 md:px-8">
      <Skeleton className="h-10 w-full max-w-xl mb-6" />

      <div className="flex items-stretch w-full gap-4 justify-center">
        <Skeleton className="hidden sm:block w-8 shrink-0 h-80 md:h-47.25 lg:h-100" />
        <Skeleton className="flex-1 h-80 md:h-47.25 lg:h-100" />
        <Skeleton className="hidden sm:block w-8 shrink-0 h-80 md:h-47.25 lg:h-100" />
      </div>
    </section>
  );
};

export const HomePageSkeleton = () => {
  return (
    <main className="bg-brand-black py-6">
      <div className="flex flex-col gap-14">
        <PromoSliderSkeleton />
        <ProductsSliderSkeleton />
        <ShopByCategorySkeleton />
        <ProductsSliderSkeleton />
      </div>
    </main>
  );
};
