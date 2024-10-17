import { FC } from 'react';

import { Catalog } from '@components/catalog/Catalog';

import { useProducts } from '@hooks/useProducts';
import { filterByCategory } from '@utils/helpers/filterByCategory';

export const Phones: FC = () => {
  const { products } = useProducts();

  const phones = filterByCategory(products, 'phones');

  return (
    <Catalog
      title="Mobile phones"
      text="Phones"
      products={phones}
      dropdown
      pagination
    />
  );
};
