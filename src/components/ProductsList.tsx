import './ProductsList.scss';

import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
  hasDiscount?: boolean;
};

export const ProductsList = ({ products, hasDiscount = true }: Props) => {
  return (
    <div className="products-list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          hasDiscount={hasDiscount}
        />
      ))}
    </div>
  );
};
