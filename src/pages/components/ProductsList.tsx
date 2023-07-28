import { FC } from 'react';
// import { ProductCard } from './ProductCard';
import '../../styles/styles.scss';
import { Phone } from '../../types/Phone';
import { ProductCard } from './ProductCard';

type Props = {
  products: Phone[],
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
