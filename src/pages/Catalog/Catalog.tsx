import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/products';

import { Product } from '../../types/Product';
import { ProductFilterType } from '../../types/ProductFilterType';

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
  const currentCategory = searchParams.get('category');
  const currentPage = searchParams.get('page');
  const currentSortFilter = searchParams.get('sort');
  const itemsPerPage =
    searchParams.get('items-per-page') || ITEMS_PER_PAGE_INITIAL;

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    setIsLoading(true);

    if (searchParams.has('category')) {
      filtered = filtered.filter(
        product => product.category === currentCategory,
      );
    }

    filteredProductsAmount.current = filtered.length;
    totalPages.current = Math.ceil(filtered.length / +itemsPerPage);

    if (searchParams.has('sort')) {
      switch (currentSortFilter) {
        case ProductFilterType.Newest: {
          filtered = filtered.sort((p1, p2) => p2.year - p1.year);

          break;
        }

        case ProductFilterType.Latest: {
          filtered = filtered.sort((p1, p2) => p1.year - p2.year);

          break;
        }

        case ProductFilterType.PriceAscending: {
          filtered = filtered.sort((p1, p2) => p1.price - p2.price);

          break;
        }

        case ProductFilterType.PriceDescending: {
          filtered = filtered.sort((p1, p2) => p2.price - p1.price);

          break;
        }
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
  }, [
    products,
    searchParams,
    currentCategory,
    currentPage,
    currentSortFilter,
    itemsPerPage,
  ]);

  const handlerPageChange = (page: number) => {
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
        <div className="section-title-wrapper">
          <h1>Catalog</h1>
          <p className="main-text main-text--secondary">
            {filteredProductsAmount.current} items
          </p>
        </div>

        <div className={styles['catalog__filters-wrapper']}>
          <Select
            title="Sort by"
            placeholder="Choose"
            options={Object.values(ProductFilterType)}
            searchParamKey="sort"
          />
          <Select
            title="Items On Page"
            placeholder={ITEMS_PER_PAGE_INITIAL}
            options={['8', '12', '16']}
            searchParamKey="items-per-page"
          />
        </div>

        <div className={styles['catalog__products-wrapper']}>
          {isLoading && 'Loading'}
          {!isLoading &&
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <div className={styles['catalog__pagination-wrapper']}>
          <Pagination
            currentPage={+(searchParams.get('page') ?? 1)}
            totalPages={totalPages.current}
            visibleCount={5}
            onPageChange={page => handlerPageChange(page)}
          />
        </div>
      </div>
    </section>
  );
};
