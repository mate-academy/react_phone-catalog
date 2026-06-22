import { Suspense } from 'react';

import { CatalogSkeleton } from '@/shared/ui/Skeleton';
import { CatalogPage } from '@/views/Catalog';

const TabletsPage = () => {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogPage categoryName="Tablets" />
    </Suspense>
  );
};

export default TabletsPage;
