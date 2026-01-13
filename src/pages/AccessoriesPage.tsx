import { useEffect, useMemo } from 'react';

import '../components/Catalog/Catalog.scss';
import { ProductAllType } from '../types/Product';
import { Catalog } from '../components/Catalog';
import { useProducts } from '../context/ProductsContext';
import { getProducts } from '../api/httpsRequest';

export const AccessoriesPage = () => {
  const { productsAll, addToDB } = useProducts();

  useEffect(() => {
    getProducts('allProducts').then(products => {
      addToDB('allProducts', products);
    });
  }, [productsAll, addToDB]);

  const products: ProductAllType[] = useMemo(() => {
    return productsAll.filter(product => product.category === 'accessories');
  }, [productsAll]);

  return <Catalog products={products} nameCategory="accessories" />;
};
