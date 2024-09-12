import { FC } from 'react';
import { Catalog } from '@components/catalog/Catalog';

import { useAppSelector } from '@hooks/hook';
import { filterByCategory } from '@utils/helpers/filterByCategory';

export const Phones: FC = () => {
  const { products } = useAppSelector(state => state.products);

  const phones = filterByCategory(products, 'phones');

  return (
    <Catalog
      title="Mobile phones"
      text="Phones"
      products={phones}
      dropdown={true}
      pagination={true}
    />
  );
};
