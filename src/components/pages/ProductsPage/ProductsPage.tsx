import './ProductsPage.scss';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../../types/Product';
import { Dropdown } from '../../Dropdown';
import { ProductCard } from '../../ProductCard';
import { Pagination } from '../../Pagination/Pagination';

interface Props {
  products: Product[];
  title: string;
}

const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const perPageOptions = [
  { value: 'all', label: 'All' },
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
];

export const ProductsPage: React.FC<Props> = ({ products, title }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  const sortedProducts = useMemo(() => {
    const copy = [...products];

    return copy.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        default:
          return b.year - a.year;
      }
    });
  }, [products, sortBy]);

  const itemsToShow = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const limit = Number(perPage);
    const start = (currentPage - 1) * limit;
    const end = start + limit;

    return sortedProducts.slice(start, end);
  }, [sortedProducts, perPage, currentPage]);

  return (
    <div className="products-page">
      <h1 className="products-page__title">{title}</h1>
      <p className="products-page__count">
        {`${sortedProducts.length} models`}
      </p>

      <div className="products-page__filters">
        <div className="products-page__filter-sort">
          <Dropdown label="Sort by" options={sortOptions} paramName="sort" />
        </div>

        <div className="products-page__filter-per-page">
          <Dropdown
            label="Items on page"
            options={perPageOptions}
            paramName="perPage"
          />
        </div>
      </div>

      <div className="products-page__grid">
        {itemsToShow.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {perPage !== 'all' && (
        <Pagination total={sortedProducts.length} perPage={Number(perPage)} />
      )}
    </div>
  );
};
