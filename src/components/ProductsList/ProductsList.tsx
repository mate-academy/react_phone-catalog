import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="products-list">
      {products.map(product => (
        <div key={product.itemId} className="products-list__item">
          <ProductCard discount={true} product={product} />
        </div>
      ))}
    </div>
  );
};
