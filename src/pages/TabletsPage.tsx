import { useEffect, useState } from 'react';
import { Product } from '../helpers/Product';
import { ProductList } from '../components/ProductList';
import { useMyContext } from '../context/context';

export const TabletsPage = () => {
  const { products } = useMyContext();
  const [tablets, setTablets] = useState<Product[] | null>(null);

  useEffect(() => {
    setTablets(() => (
      products.filter((product) => product.category === 'phone')));
  }, [products]);

  return (
    <ProductList
      page="tablets"
      title="tablets"
      products={tablets}
    />
  );
};
