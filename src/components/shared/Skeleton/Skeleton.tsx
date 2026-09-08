import './Skeleton.style.scss';

import React from 'react';
import { Page } from '../../../types/Page';
import { HomeSkeleton } from './HomeSkeleton/HomeSkeleton';
import { CatalogSkeleton } from './CatalogSkeleton/CatalogSkeleton';
import { ProductPageSkeleton } from './ProductPageSkeleton/ProductPageSkeleton';

type Props = {
  page: Page;
};

export const Skeleton: React.FC<Props> = ({ page }) => {
  if (page === 'products') {
    return <CatalogSkeleton />;
  }

  if (page === 'productDetails') {
    return <ProductPageSkeleton />;
  }

  return <HomeSkeleton />;
};
