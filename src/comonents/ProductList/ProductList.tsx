import { Product } from '../../type/Product';
import { ProductCard } from '../ProductCard';

import './ProductList.scss';

type Props = {
  productsForCurrentPage: Product[],
};

export const ProductList: React.FC<Props> = ({ productsForCurrentPage }) => {
  return (
    <ul className="product-list" data-cy="productList">
      {productsForCurrentPage.map(product => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
