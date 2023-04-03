import { memo } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './products.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = memo(({ products }) => {
  return (
    <div className="products" data-cy="productList">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});
