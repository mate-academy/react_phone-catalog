import { Skeleton } from './Skeleton';

export const ProfileSkeleton = () => {
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <Skeleton className="mb-8 h-9 w-48 bg-brand-elements/50" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="border border-brand-elements bg-brand-surface-1 p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <Skeleton className="h-20 w-20 bg-brand-elements/50" />
              <Skeleton className="mt-4 h-6 w-32 bg-brand-elements/50" />
              <Skeleton className="mt-2 h-4 w-40 bg-brand-elements/50" />
            </div>

            <hr className="my-6 border-brand-elements" />

            <Skeleton className="h-10 w-full bg-brand-elements/50" />
          </div>

          <div className="md:col-span-2 border border-brand-elements bg-brand-surface-1 p-6 shadow-sm">
            <Skeleton className="mb-4 h-6 w-40 bg-brand-elements/50" />

            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-brand-elements py-12 text-center">
              <Skeleton className="h-4 w-64 bg-brand-elements/30" />
              <Skeleton className="mt-2 h-3 w-52 bg-brand-elements/30" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-7 px-4 mx-auto max-w-4xl">
        <Skeleton className="mb-4 h-6 w-56 bg-brand-elements/50" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Skeleton className="h-48 bg-brand-elements/30" />
          <Skeleton className="h-48 bg-brand-elements/30" />
          <Skeleton className="h-48 bg-brand-elements/30" />
          <Skeleton className="h-48 bg-brand-elements/30" />
        </div>
      </div>
    </>
  );
};
