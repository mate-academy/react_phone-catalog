import { useEffect, useMemo } from 'react';

import '../components/Catalog/Catalog.scss';
import { ProductAllType } from '../types/Product';
import { Catalog } from '../components/Catalog';
import { useProducts } from '../context/ProductsContext';
import { getProducts } from '../api/httpsRequest';

export const PhonesPage = () => {
  const { productsAll, addToDB } = useProducts();



  useEffect(() => {
    getProducts('allProducts').then(productsAll => {
      addToDB('allProducts', productsAll);
    });
  }, []);

  const products: ProductAllType[] = useMemo(() => {
    return productsAll.filter(product => product.category === 'phones').sort();
  }, [productsAll]);

  return <Catalog products={products} />;
};
