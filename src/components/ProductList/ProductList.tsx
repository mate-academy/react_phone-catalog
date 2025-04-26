import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductList.scss';

type Props = {
  products: Product[];
};

export const PorductList: React.FC<Props> = React.memo(({ products }) => {
  return (
    <div className="productList">
      <ul className="productList__list">
        {products.map(product => (
          <li className="productList__list-item" key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
});

PorductList.displayName = 'PorductList';
