import { useEffect, useState } from 'react';
import { Product } from '../helpers/Product';
import { ProductList } from '../components/ProductList';
import { useMyContext } from '../context/context';

export const AccessoriesPage = () => {
  const { products } = useMyContext();
  const [accessories, setAccessories] = useState<Product[] | null>(null);

  useEffect(() => {
    setAccessories(() => (
      products.filter((product) => product.category === 'phone')));
  }, [products]);

  return (
    <ProductList
      page="accessories"
      title="accessories"
      products={accessories}
    />
  );
};
