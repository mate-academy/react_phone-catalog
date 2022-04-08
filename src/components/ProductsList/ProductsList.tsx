import { FunctionComponent } from 'react';

// Styles
import './ProductsList.scss';

// Types
import { Product } from '../../types/Product';

// Components
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
};

export const ProductsList: FunctionComponent<Props> = ({ products }) => (
  <ul className="ProductsList">
    {products.map(product => (
      <li key={product.id}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);
