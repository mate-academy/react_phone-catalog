import { FC } from 'react';

import { Catalog } from '@components/catalog/Catalog';

import { useAppSelector } from '@hooks/hook';
import { filterByCategory } from '@utils/helpers/filterByCategory';

export const Tablets: FC = () => {
  const { products, loading } = useAppSelector(state => state.products);

  const tablets = filterByCategory(products, 'tablets');

  return (
    <Catalog
      title="Apple iPad"
      products={tablets}
      text="Tablets"
      loading={loading}
    />
  );
};
