import { FC } from 'react';

import { Catalog } from 'components/catalog/Catalog';

import { useAppSelector } from 'hooks/hook';
import { filterByCategory } from 'utils/helpers/filterByCategory';

export const Accessories: FC = () => {
  const { products, loading } = useAppSelector(state => state.products);

  const accessories = filterByCategory(products, 'accessories');

  return (
    <Catalog
      title="Accessories (Apple Watch)"
      products={accessories}
      text="Accessories"
      loading={loading}
    />
  );
};
