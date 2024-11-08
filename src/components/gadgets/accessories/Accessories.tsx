import { FC } from 'react';

import { Catalog } from '@components/catalog/';

import { useProducts } from '@hooks/index';

import { filterByCategory } from '@utils/helpers/productUtils';
import { CatalogTitle } from '@utils/types/catalog.interface';

export const Accessories: FC = () => {
  const { products } = useProducts();

  const accessories = filterByCategory(products, CatalogTitle.accessories);

  return (
    <Catalog
      text={CatalogTitle.accessories}
      products={accessories}
      isDropdown
      isPagination
    />
  );
};
