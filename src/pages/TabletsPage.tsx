import { useMemo } from 'react';

import '../components/Catalog/Catalog.scss';

import { Catalog } from '../components/Catalog';
import { useProducts } from '../context/ProductsContext';
import { ProductAllType } from '../types/Product';

export const TabletsPage = () => {
  const { productsAll } = useProducts();

  const products: ProductAllType[] = useMemo(() => {
    return productsAll.filter(product => product.category === 'tablets');
  }, [productsAll]);

  return <Catalog products={products} categoryName={'tablets'} />;
};
