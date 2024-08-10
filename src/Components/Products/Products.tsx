import React from 'react';
import { Product } from '../../Types/Product';
import { ProductCard } from '../ProductCard';
import classNames from 'classnames';
import './Products.scss';

type Props = {
  products: Product[];
  type?: 'slider' | '';
  cardTransform?: number;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  catalog?: boolean;
};

export const Products: React.FC<Props> = ({
  products,
  type,
  cardTransform = 0,
  onTouchStart = () => {},
  onTouchEnd = () => {},
  catalog,
}) => {
  return (
    <ul
      className={classNames('products', {
        grid: catalog,
        'products--slider': type === 'slider',
      })}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {products.map(product => (
        <li
          key={product.id}
          className={classNames('products__card grid__item', {
            'products__card--slider': type === 'slider',
          })}
        >
          <ProductCard product={product} transform={cardTransform} />
        </li>
      ))}
    </ul>
  );
};
