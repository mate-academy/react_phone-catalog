import { FC } from 'react';
import { ProductsList } from './ProductsList';
import { Product } from '../types';

type Props = {
  products: Product[];
};

export const Catalog: FC<Props> = ({ products }) => {
  return (
    <>
      <p className="mt-[8px] text-secondary">
        {products.length} {products.length === 1 ? 'model' : 'models'}
      </p>
      <ProductsList products={products} />
    </>
  );
};
