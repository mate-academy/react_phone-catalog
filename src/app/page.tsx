import { Suspense } from 'react';

import { HomePageSkeleton } from '@/shared/ui/Skeleton';
import { HomePage } from '@/views/Home';

export const Page = () => {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePage />
    </Suspense>
  );
};

export default Page;
