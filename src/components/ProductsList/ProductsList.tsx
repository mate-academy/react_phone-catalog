import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul
      className="products-list"
      data-cy="productList"
    >
      {products.map(product => (
        <ProductCard
          product={product}
          key={product.id}
        />
      ))}
    </ul>
  );
};
