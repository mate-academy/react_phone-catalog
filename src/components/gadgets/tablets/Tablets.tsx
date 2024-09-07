import { FC } from 'react';

<<<<<<< HEAD
import { Catalog } from '@components/catalog/Catalog';

import { useAppSelector } from '@hooks/hook';
import { filterByCategory } from '@utils/helpers/filterByCategory';
=======
import { Catalog } from 'components/catalog/Catalog';

import { useAppSelector } from 'hooks/hook';
import { filterByCategory } from 'utils/helpers/filterByCategory';
>>>>>>> 3d29229bf5a890910a3e7c1d3c6b79a9929789c2

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
