import { FC } from 'react';

import { Catalog } from '@components/catalog/';

import { useProducts } from '@hooks/index';

import { filterByCategory } from '@utils/helpers/productUtils';
import { CatalogTitle } from '@utils/types/catalog.interface';

export const Phones: FC = () => {
  const { products } = useProducts();

  const phones = filterByCategory(products, CatalogTitle.phones);

  return (
    <Catalog
      text={CatalogTitle.phones}
      products={phones}
      isDropdown
      isPagination
    />
  );
};
