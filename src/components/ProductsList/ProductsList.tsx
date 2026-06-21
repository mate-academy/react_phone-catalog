import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

interface Props {
  products: Product[];
}

export const ProductsList = ({ products }: Props) => {
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
