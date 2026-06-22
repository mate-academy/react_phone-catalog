import { Suspense } from 'react';

import { CatalogSkeleton } from '@/shared/ui/Skeleton/CatalogSkeleton';
import { CatalogPage } from '@/views/Catalog';

const PhonesPage = () => {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogPage categoryName="Phones" />
    </Suspense>
  );
};

export default PhonesPage;
