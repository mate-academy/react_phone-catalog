import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductsList.scss';

type Props = {
  products: Product[],
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="products-list">
      {products.map(product => (
        <ProductCard
          product={product}
          key={product.id}
        />
      ))}
    </div>
  );
};
