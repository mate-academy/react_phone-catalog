/* eslint-disable max-len */
import './PhonesPage.scss';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../../types/Product';
import { ProductCard } from '../../ProductCard/ProductCard';
import { SortSelector } from '../../SortSelector/SortSelector';
import { ItemsPerPage } from '../../ItemsPerPage/ItemsPerPage';
import { Pagination } from '../../Pagination/Pagination';
import { Breadcrumbs } from '../../Breadcrumbs/Breadcrumbs';

interface Props {
  products: Product[];
  title: string;
}

export const PhonesPage: React.FC<Props> = ({ products, title }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      default:
        return b.year - a.year;
    }
  });

  const total = sortedProducts.length;
  const isAll = perPage === 'all';
  const itemsCount = isAll ? total : Number(perPage);

  const start = (currentPage - 1) * itemsCount;
  const end = isAll ? total : start + itemsCount;
  const visibleProducts = sortedProducts.slice(start, end);

  return (
    <div className="phones-page container">
      <Breadcrumbs />

      <h1 className="phones-page__title">{title}</h1>
      <p className="phones-page__count">{`${total} models`}</p>

      {total > 0 ? (
        <>
          <div className="phones-page__filters">
            <SortSelector />
            <ItemsPerPage />
          </div>

          <div className="phones-page__list">
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {!isAll && total > itemsCount && (
            <Pagination total={total} perPage={itemsCount} />
          )}
        </>
      ) : (
        <p className="phones-page__empty">
          {`No ${title.toLowerCase()} found`}
        </p>
      )}
    </div>
  );
};
