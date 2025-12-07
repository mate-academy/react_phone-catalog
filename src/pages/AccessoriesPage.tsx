import { useMemo } from 'react';
import accessoriesFromServer from '../../public/api/products.json';

import '../components/Catalog/Catalog.scss';
import { Product } from '../types/Product';
import { Catalog } from '../components/Catalog';

export const AccessoriesPage = () => {
  const products: Product[] = useMemo(() => {
    return accessoriesFromServer.filter(
      product => product.category === 'accessories',
    );
  }, []);

  return <Catalog products={products} />;
};
