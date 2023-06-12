import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';

type ProductsListProps = {
  products: Product[]
};

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <ul>
      {
        products.map(product => (
          <li>
            <ProductCard product={product} />
          </li>
        ))
      }
    </ul>
  );
};
