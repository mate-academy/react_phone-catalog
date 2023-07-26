import { FC } from 'react';
import { ProductCard } from './ProductCard';
import '../../styles/blocks/products-list.scss';

export const ProductsList: FC = () => {
  return (
    <ul className="products-list">
      <li className="products-list__item">
        <ProductCard />
      </li>
      <li className="products-list__item">
        <ProductCard />
      </li>
      <li className="products-list__item">
        <ProductCard />
      </li>
      <li className="products-list__item">
        <ProductCard />
      </li>
      <li className="products-list__item">
        <ProductCard />
      </li>
    </ul>
  );
};
