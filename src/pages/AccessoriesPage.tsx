import { useEffect, useMemo } from 'react';

import '../components/Catalog/Catalog.scss';
import { ProductAllType, ProductType } from '../types/Product';
import { Catalog } from '../components/Catalog';
import { useProducts } from '../context/ProductsContext';
import { getProducts } from '../api/httpsRequest';

export const AccessoriesPage = () => {
  const { productsAll, addToDB } = useProducts();

  useEffect(() => {
    getProducts('allProducts').then(productsAll => {
      addToDB('allProducts', productsAll);
    });
  }, []);

  const products: ProductAllType[] = useMemo(() => {
    return productsAll.filter(product => product.category === 'accessories');
  }, [productsAll]);

  return <Catalog products={products} />;
};
