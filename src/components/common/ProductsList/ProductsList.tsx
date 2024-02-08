import React, { memo } from 'react';
import { Product } from '../../../definitions/types/Product';
import ProductCard from '../ProductCard';

import './ProductsList.scss';

interface Props {
  products: Product[],
  loading?: boolean,
  placeholdersAmount: number,
  customNoProductsText?: string | null,
}

export const ProductsList: React.FC<Props> = memo(({
  loading,
  products,
  placeholdersAmount,
  customNoProductsText,
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
    return (
      <section className='products-list--no-products'>
        {(customNoProductsText ?? false) ? (
          <p>{customNoProductsText}</p>
        ) : (<>
          <p>No products yet</p>
          <p>
            Follow the updates on our <a href="https://www.instagram.com/apple/" target='_blank'>
              Instagram
            </a>
          </p>
        </>)}
      </section>
    );
  }

  return (
    <section className="products-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
});
