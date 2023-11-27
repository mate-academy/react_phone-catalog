import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './style.scss';

type ProductsListProps = {
  products: Product[];
};

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <ul data-cy="productList" className="product-list">
      {products.map((product) => (
        <li className="product-list__item" key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
