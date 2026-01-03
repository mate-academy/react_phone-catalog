import { useMemo } from 'react';

import '../components/Catalog/Catalog.scss';
import { ProductAllType } from '../types/Product';
import { Catalog } from '../components/Catalog';
import { useProducts } from '../context/ProductsContext';

export const PhonesPage = () => {
  const { productsAll } = useProducts();

  const products: ProductAllType[] = useMemo(() => {
    return productsAll.filter(product => product.category === 'phones');
  }, []);

  return <Catalog products={products} />;
};
