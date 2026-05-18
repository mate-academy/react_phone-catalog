import { useMemo } from 'react';

import '../components/Catalog/Catalog.scss';
import { ProductAllType } from '../types/Product';
import { Catalog } from '../components/Catalog';
import { useProducts } from '../context/ProductsContext';

export const AccessoriesPage = () => {
  const { productsAll } = useProducts();

  const products: ProductAllType[] = useMemo(() => {
    return productsAll.filter(product => product.category === 'accessories');
  }, [productsAll]);

  return <Catalog products={products} categoryName="accessories" />;
};
