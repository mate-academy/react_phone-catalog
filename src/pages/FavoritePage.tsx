import { useMemo } from 'react';
import tabletsFromServer from '../../public/api/products.json';

import '../components/Catalog/Catalog.scss';
import { Product } from '../types/Product';
import { Catalog } from '../components/Catalog';

export const FavoritePage = () => {
  const products: Product[] = useMemo(() => {
    return tabletsFromServer.filter(product => product.category === 'tablets');
  }, []);

  return <Catalog products={products} dropdown={false} pagination={false} />;
};
