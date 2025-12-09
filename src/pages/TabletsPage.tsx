import { useMemo } from 'react';

import '../components/Catalog/Catalog.scss';
import { Product } from '../types/Product';
import { Catalog } from '../components/Catalog';
import { useProducts } from '../context/ProductsContext';

export const TabletsPage = () => {
  const { productsAll } = useProducts();

  const products: Product[] = useMemo(() => {
    return productsAll.filter(product => product.category === 'tablets');
  }, []);

  return <Catalog products={products} />;
};
