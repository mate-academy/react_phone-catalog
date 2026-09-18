import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
};

export const ProductsList = ({ products }: Props) => {
  return (
    <div className="columns is-multiline" data-cy="ProductsList">
      {products.map(product => (
        <div
          key={product.id}
          className="column is-one-quarter-desktop is-half-tablet"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
