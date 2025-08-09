import React, { useState } from 'react';
import './ProductsList.scss';
import { Product } from '../../utils/Product';
import { ProductCard } from '../ProductCard';
import { PaginationControl } from '../PaginationControl';

type Props = {
  products: Product[];
  title: string;
};

const PAGE_SIZE = 4;

export const ProductsList: React.FC<Props> = ({ products, title }) => {
  const [page, setPage] = useState(0);

  const startIndex = page * PAGE_SIZE;
  const visibleProducts = products.slice(startIndex, startIndex + PAGE_SIZE);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  return (
    <>
      <div className="header-row">
        <h2>{title}</h2>
        <PaginationControl
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
      <div className="products-list">
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
