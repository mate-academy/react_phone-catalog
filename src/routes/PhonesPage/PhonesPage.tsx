import { useState, useEffect } from 'react';

import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { FilterSelector } from '../../components/FilterSelector/FilterSelector';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Pagination } from '../../components/Pagination/Pagination';
import { Filter, Page } from '../../types/filters';
import { Product } from '../../types/product';
import {
  filterProducts,
  getSelectedTypeProducts,
} from '../../helpers/productsFunctions';
import { getItemsToShowIndex } from '../../helpers/pagination';
import './PhonesPage.scss';

const filters: Filter[] = [
  {
    label: 'Newest',
    value: 'age',
  },
  {
    label: 'Alphabetically',
    value: 'name',
  },
  {
    label: 'Cheapest',
    value: 'price',
  },
];

const pages: Page[] = ['all', '4', '8', '16'];

export const PhonesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState('age');
  const [perPage, setPerPage] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getSelectedTypeProducts('phone').then(setProducts);
  }, []);

  const onActiveFilterChange = (value: string) => setActiveFilter(value);
  const onPageChange = (value: number) => setPage(value);
  const onPerPageChange = (value: string) => {
    setPage(1);
    setPerPage(value);
  };

  const [from, to] = getItemsToShowIndex(perPage, page, products.length);
  const filteredProducts = filterProducts(products, activeFilter).slice(
    from,
    to,
  );

  return (
    <section className="phones-page">
      <div className="phones-page__crumbs">
        <BreadCrumbs />
      </div>

      <h1 className="phones-page__title">Mobile phones</h1>
      <p className="phones-page__count">{`${products.length} models`}</p>

      <div className="phones-page__selectors">
        <FilterSelector
          name="sort"
          label="Sort by"
          width={176}
          options={filters}
          onChange={onActiveFilterChange}
        />

        <FilterSelector
          name="page"
          label="Items on page"
          width={128}
          options={pages}
          onChange={onPerPageChange}
        />
      </div>

      <div className="phones-page__products-list">
        <ProductsList products={filteredProducts} />
      </div>

      {perPage !== 'all' && (
        <Pagination
          total={products.length}
          currentPage={page}
          onPageChange={onPageChange}
          perPage={perPage}
        />
      )}
    </section>
  );
};
