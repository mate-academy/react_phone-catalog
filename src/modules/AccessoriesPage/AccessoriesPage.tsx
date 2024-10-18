import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../servises/products';
import { ProductsCatalog } from '../ProductsCatalog';

export const AccessoriesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);

  useEffect(() => {
    getProductsByCategory('accessories').then(setPhones);
  }, []);

  return <ProductsCatalog title="Mobile phones" products={phones} />;
};
