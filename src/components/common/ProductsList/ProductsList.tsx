import React, { memo } from 'react';
import { Product } from '../../../definitions/types/Product';
import ProductCard from '../ProductCard';

import './ProductsList.scss';

interface Props {
  products: Product[],
}

export const ProductsList: React.FC<Props> = memo(({ products }) => (
  <section className="products-list">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </section>
));
