import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../servises/products';
import { ProductsCatalog } from '../ProductsCatalog';

export const TabletsPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    getProductsByCategory('tablets').then(setPhones);
  }, []);

  return <ProductsCatalog title="Mobile phones" products={phones} />;
};
