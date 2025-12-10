import { useMemo } from 'react';

import '../components/Catalog/Catalog.scss';

import { Catalog } from '../components/Catalog';
import { useProducts } from '../context/ProductsContext';
import { ProductType } from '../types/Product';

export const TabletsPage = () => {
  const { productsAll } = useProducts();

  const products: ProductType[] = useMemo(() => {
    return productsAll.filter(product => product.category === 'tablets');
  }, []);

  return <Catalog products={products} />;
};
