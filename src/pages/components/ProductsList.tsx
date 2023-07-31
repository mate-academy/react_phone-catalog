import { FC } from 'react';
// import { ProductCard } from './ProductCard';
import '../../styles/styles.scss';
import { Product } from '../../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[],
};

export const ProductsList: FC<Props> = ({ products }) => {
  return (
    <ul className="products-list">
      {products.map(product => (
        <li className="products-list__item" key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
