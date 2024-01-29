import React, { memo } from 'react';
import { Product } from '../../../definitions/types/Product';
import ProductCard from '../ProductCard';

import './ProductsList.scss';
import Placeholder from '../../UI/Placeholder';

interface Props {
  products: Product[] | null,
  loading?: boolean,
  placeholdersAmount: number,
}

export const ProductsList: React.FC<Props> = memo(({
  loading,
  products,
  placeholdersAmount,
}) => {
  if (products === null || loading) {
    const placeholders = Array.from(
      { length: placeholdersAmount },
      (_, index) => <Placeholder height='504px' key={index} />
    );

    return (
      <section className="products-list">
        {placeholders}
      </section>
    )
  }

  if (!products.length) {
    return <p>No products yet</p>
  }

  return (
    <section className="products-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
});
