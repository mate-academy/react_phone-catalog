import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/products';

import { Product } from '../../types/Product';

import { Select } from '../../components/UI/Select';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from './components/Pagination';

import styles from './Catalog.module.scss';
// import { SearchLink } from '../../components/SearchLink';

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const filteredProductsAmount = useRef(0);
  const totalPages = useRef(0);

  // const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');
  const currentPage = searchParams.get('page');

  const ITEMS_PER_PAGE = 12;

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchParams.has('category')) {
      filtered = filtered.filter(
        product => product.category === currentCategory,
      );
    }

    filteredProductsAmount.current = filtered.length;
    totalPages.current = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    if (searchParams.has('page')) {
      if (currentPage) {
        const start = (+currentPage - 1) * ITEMS_PER_PAGE;

        filtered = filtered.slice(start, start + ITEMS_PER_PAGE);
      }
    }

    return filtered;
  }, [products, searchParams, currentCategory, currentPage]);

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

        <div className="catalog__filters-wrapper">
          <Select />
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
