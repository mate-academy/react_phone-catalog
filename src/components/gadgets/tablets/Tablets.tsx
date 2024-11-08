import { FC } from 'react';

import { Catalog } from '@components/catalog/';

import { useProducts } from '@hooks/index';

import { filterByCategory } from '@utils/helpers/productUtils';
import { CatalogTitle } from '@utils/types/catalog.interface';

export const Tablets: FC = () => {
  const { products } = useProducts();

  const tablets = filterByCategory(products, CatalogTitle.tablets);

  return (
    <Catalog
      text={CatalogTitle.tablets}
      products={tablets}
      isDropdown
      isPagination
    />
  );
};
