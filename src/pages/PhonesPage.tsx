import { useEffect, useMemo } from 'react';

import '../components/Catalog/Catalog.scss';
import { ProductAllType } from '../types/Product';
import { Catalog } from '../components/Catalog';
import { useProducts } from '../context/ProductsContext';
import { getProducts } from '../api/httpsRequest';

export const PhonesPage = () => {
  const { productsAll } = useProducts();

  const products: ProductAllType[] = useMemo(() => {
    return productsAll.filter(product => product.category === 'phones');
  }, [productsAll]);

  return <Catalog products={products} NameCategory={'phones'} />;
};
