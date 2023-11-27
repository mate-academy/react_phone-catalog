import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

import './ProductList.scss';

type Props = {
  products: Product[]
};

export const ProductList: React.FC<Props> = ({ products }) => (
  <div
    className="ProductList"
    data-cy="productList"
  >
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
