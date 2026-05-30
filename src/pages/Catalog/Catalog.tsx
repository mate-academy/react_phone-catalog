import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/products';

import { productsFilter } from '../../utils/productsFilter';
import { getEnumValue } from '../../utils/getEnumValue';
import { skeletonProduct } from '../../utils/Skeletons/skeletonProduct';

import { Product } from '../../types/Product';
import { Category } from '../../types/Category';
import { SortFilter } from '../../types/SortFilter';

import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Select } from '../../components/UI/Select';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from './components/Pagination';

import styles from './Catalog.module.scss';

const ITEMS_PER_PAGE_INITIAL = '12';

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const filteredProductsAmount = useRef(0);
  const totalPages = useRef(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page');
  const itemsPerPage =
    searchParams.get('items-per-page') || ITEMS_PER_PAGE_INITIAL;

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    setIsLoading(true);

    if (searchParams.has('category')) {
      const filter = getEnumValue(Category, searchParams.get('category'));

      if (filter) {
        filtered = productsFilter.byCategory(filtered, filter);
      }
    }

    // this order is required
    filteredProductsAmount.current = filtered.length;
    totalPages.current = Math.ceil(filtered.length / +itemsPerPage);

    if (searchParams.has('sort')) {
      const filter = getEnumValue(SortFilter, searchParams.get('sort'));

      if (filter) {
        filtered = productsFilter.bySortFilter(filtered, filter);
      }
    }

    if (searchParams.has('page')) {
      if (currentPage) {
        const start = (+currentPage - 1) * +itemsPerPage;

        filtered = filtered.slice(start, start + +itemsPerPage);
      }
    }

    setIsLoading(false);

    return filtered;
  }, [products, searchParams, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    searchParams.set('page', `${page}`);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(setProducts)
      .catch()
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs />
        <div className="section-title-wrapper">
          <h1>Catalog</h1>
          <p className="main-text main-text--secondary">
            {filteredProductsAmount.current} items
          </p>
        </div>

        {filteredProducts.length !== 0 && (
          <div className={styles['catalog__filters-wrapper']}>
            <Select
              title="Sort by"
              placeholder="Choose"
              options={Object.values(SortFilter)}
              searchParamKey="sort"
            />
            <Select
              title="Items On Page"
              placeholder={ITEMS_PER_PAGE_INITIAL}
              options={['8', '12', '16']}
              searchParamKey="items-per-page"
            />
          </div>
        )}

        <div className={styles['catalog__products-wrapper']}>
          {isLoading &&
            Array.from({ length: +itemsPerPage }).map((_, index) => (
              <ProductCard
                key={`skeleton-${index}`}
                product={skeletonProduct}
                variant="skeleton"
              />
            ))}
          {!isLoading &&
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        {!isLoading && filteredProducts.length !== 0 && (
          <div className={styles['catalog__pagination-wrapper']}>
            <Pagination
              currentPage={+(currentPage ?? 1)}
              totalPages={totalPages.current}
              visibleCount={5}
              onPageChange={page => handlePageChange(page)}
            />
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <p className="main-text main-text--centered">
            No products matching these criteria
          </p>
        )}
      </div>
    </section>
  );
};
