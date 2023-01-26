import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Pagination } from '../Pagination/Pagination';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';

type Props = {
  totalProducts: number,
  products: Product[],
};

export const ProductsList: React.FC<Props> = ({
  totalProducts,
  products,
}) => {
  const [searchParams] = useSearchParams();

  const itemsOnPage = searchParams.get('perPage') || 'All';

  const showPagination
    = itemsOnPage !== 'All'
    && totalProducts / +itemsOnPage > 1;

  return (
    <section
      className="page__section products-list"
      data-cy="productList"
    >
      <div className="products-list__list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
      {showPagination && (
        <div className="products-list__pagination">
          <Pagination totalProducts={totalProducts} />
        </div>
      )}
    </section>
  );
};
