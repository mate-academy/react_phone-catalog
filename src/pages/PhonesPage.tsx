import React, { useMemo, useState } from 'react';

import phonesFromServer from '../../public/api/products.json';

import '../components/Catalog/Catalog.scss';
import { Product } from '../types/Product';
import { Catalog } from '../components/Catalog';

export const PhonesPage = () => {
  const products: Product[] = useMemo(() => {
    return phonesFromServer.filter(product => product.category === 'phones');
  }, []);

  return <Catalog products={products} />;
};
