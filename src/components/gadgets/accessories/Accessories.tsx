import { FC } from 'react';

import { Catalog } from '@components/catalog/Catalog';

import { useProducts } from '@hooks/useProducts';
import { filterByCategory } from '@utils/helpers/filterByCategory';

export const Accessories: FC = () => {
  const { products } = useProducts();

  const accessories = filterByCategory(products, 'accessories');

  return (
    <Catalog
      title="Accessories (Apple Watch)"
      products={accessories}
      text="Accessories"
      dropdown
      pagination
    />
  );
};
