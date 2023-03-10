import { FC } from 'react';
import { ProductList } from '../components/ProductList';
import { Product } from '../types/Product';

type Props = {
  isLoading: boolean;
  products: Product[] | [];
};

export const Tablets: FC<Props> = ({ isLoading, products }) => {
  return (
    <>
      {isLoading ? (
        <h3>Loading.....</h3>
      ) : (
        <ProductList products={products} title="Tablets" />
      )}
    </>
  );
};
