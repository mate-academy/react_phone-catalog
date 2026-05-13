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
}

export const PhonesPage: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;

  const phones = products.filter(p => p.category === 'phones');

  const sortedPhones = [...phones].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      default:
        return b.year - a.year;
    }
  });

  const total = sortedPhones.length;
  const isAll = perPage === 'all';
  const itemsCount = isAll ? total : Number(perPage);

  const start = (currentPage - 1) * itemsCount;
  const end = isAll ? total : start + itemsCount;
  const visiblePhones = sortedPhones.slice(start, end);

  return (
    <div className="phones-page container">
      <Breadcrumbs />

      <h1 className="phones-page__title">Mobile phones</h1>
      <p className="phones-page__count">{`${total} models`}</p>

      <div className="phones-page__filters">
        <SortSelector />
        <ItemsPerPage />
      </div>

      <div className="phones-page__list">
        {visiblePhones.map(phone => (
          <ProductCard key={phone.id} product={phone} />
        ))}
      </div>

      {total === 0 && <p className="phones-page__empty">No phones found</p>}

      {!isAll && <Pagination total={total} perPage={itemsCount} />}
    </div>
  );
};
