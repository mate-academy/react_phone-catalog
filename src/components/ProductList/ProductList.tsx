import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductList.scss';

type Props = {
  productList: Product[];
};

export const ProductList: React.FC<Props> = ({ productList }) => {
  return (
    <ul
      data-cy="productList"
      className="ProductList"
    >
      {productList.map(product => (
        <li key={product.id}>
          <ProductCard
            product={product}
          />
        </li>
      ))}
    </ul>
  );
};
