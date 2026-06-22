import { Suspense } from 'react';

import { CatalogSkeleton } from '@/shared/ui/Skeleton/CatalogSkeleton';
import { CatalogPage } from '@/views/Catalog';

const AccessoriesPage = () => {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogPage categoryName="Accessories" />
    </Suspense>
  );
};

export default AccessoriesPage;
