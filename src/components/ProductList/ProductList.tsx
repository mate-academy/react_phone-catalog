import React from 'react';
import { ProductItem } from '../../types/ProductItem';
import { ProductCard } from '../ProductCard';

import './ProductList.scss';

interface ProductListProps {
  products: ProductItem[];
  currentPage: number;
  perPage: number | 'all';
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  currentPage,
  perPage,
}) => {
  let startIndex: number;
  let endIndex: number;

  if (typeof perPage === 'number') {
    startIndex = (currentPage - 1) * perPage;
    endIndex = startIndex + perPage;
  } else {
    startIndex = 0;
    endIndex = products.length;
  }

  const visibleProducts = products.slice(startIndex, endIndex);

  return (
    <div className="product__wrapper">
      <section className="product__list">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
};

export default ProductList;
