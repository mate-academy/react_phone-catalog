import { FC } from 'react';

import { Catalog } from '@components/catalog/Catalog';

import { useProducts } from '@hooks/useProducts';
import { filterByCategory } from '@utils/helpers/filterByCategory';

export const Tablets: FC = () => {
  const { products } = useProducts();

  const tablets = filterByCategory(products, 'tablets');

  return (
    <Catalog
      title="Apple iPad"
      products={tablets}
      text="Tablets"
      dropdown
      pagination
    />
  );
};
