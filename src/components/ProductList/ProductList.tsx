import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductList.scss';

type Props = {
  products: Product[],
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="ProductList" data-cy="productList">
      {products.map(product => (
        <li key={product.id} className="ProductList__item">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
