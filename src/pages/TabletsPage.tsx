import { useEffect, useMemo } from 'react';

import '../components/Catalog/Catalog.scss';

import { Catalog } from '../components/Catalog';
import { useProducts } from '../context/ProductsContext';
import { ProductAllType } from '../types/Product';
import { getProducts } from '../api/httpsRequest';

export const TabletsPage = () => {
  const { productsAll, addToDB } = useProducts();

  useEffect(() => {
    getProducts('allProducts').then(productsAll => {
      addToDB('allProducts', productsAll);
    });
  }, []);

  const products: ProductAllType[] = useMemo(() => {
    return productsAll.filter(product => product.category === 'tablets');
  }, [productsAll]);

  return <Catalog products={products} nameCategory={'tablets'} />;
};
