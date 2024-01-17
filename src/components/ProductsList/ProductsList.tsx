import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsList.scss';

type Props = {
  products: Product[],
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="products__list" data-cy="productList">
      {products.map(product => (
        <div className="products__list-item">
          <ProductCard product={product} key={product.id} />
        </div>
      ))}
    </ul>
  );
};
