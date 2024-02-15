import React from 'react';
import '../styles/ProductsList.scss';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');

  // console.log(sort);

  return (
    <ul className="products-list">
      {products.map(product => (
        <li key={product.itemId}>
          <ProductCard
            product={product}
            data-cy="cardsContainer"
          />
        </li>
      ))}

      {sort && (
        <></>
      )}

    </ul>
  );
};
