import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './SearchWindow.scss';

type Props = {
  product: Product[];
};

export const SearchWindow: React.FC<Props> = ({ product }) => {
  const count = product.length;
  const productSort = product.sort((a, b) => b.price - a.price);

  return (
    <div className="search-window">

      <p className="search-window__count">
        {count}
        {' '}
        results
      </p>
      <div className="search-window__container">
        {productSort.map((prod) => (
          <ProductCard product={prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
};
