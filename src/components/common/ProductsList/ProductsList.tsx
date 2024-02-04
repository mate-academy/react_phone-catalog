import React, { memo } from 'react';
import { Product } from '../../../definitions/types/Product';
import ProductCard from '../ProductCard';

import './ProductsList.scss';

interface Props {
  products: Product[],
  loading?: boolean,
  placeholdersAmount: number,
}

export const ProductsList: React.FC<Props> = memo(({
  loading,
  products,
  placeholdersAmount,
}) => {
  if (loading) {
    return (
      <section className="products-list">
        {Array.from({ length: placeholdersAmount },
          (_, index) => <ProductCard product={null} key={index} />
        )}
      </section>
    );
  }

  if (!products.length && !loading) {
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
