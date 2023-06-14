import { FC } from 'react';
import { Product } from '../../types/product';
import { ProductItem } from '../ProductItem/ProductItem';

interface Props {
  products: Product[];
}

export const Products: FC<Props> = ({ products }) => {
  return (
    <>
      {products.map(product => (
        <ProductItem product={product} key={product.id} />
      ))}
    </>
  );
};
