import './ProductsList.scss';

import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
};

export const ProductsList = ({ products }: Props) => {
  return (
    <div className="products-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
