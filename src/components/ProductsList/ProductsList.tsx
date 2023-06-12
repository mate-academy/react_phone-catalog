import { Product } from '../../types/product';
import { ProductCard } from '../ProductCard/ProductCard';

import './ProductsList.scss';

type ProductsListProps = {
  products: Product[]
};

export const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <ul className="products-list">
      {
        products.map(product => (
          <li key={product.id} className="products-list__item">
            <ProductCard product={product} />
          </li>
        ))
      }
    </ul>
  );
};
