/* eslint-disable prettier/prettier */
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};
