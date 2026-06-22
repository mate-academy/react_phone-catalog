import { Suspense } from 'react';

import { SearchSkeleton } from '@/shared/ui/Skeleton';
import { SearchPage } from '@/views/Search/ui/SearchPage';

const Page = () => {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchPage />
    </Suspense>
  );
};

export default Page;
