import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductList } from '../ProductList/ProductList';
import styles from './CatalogPage.module.scss';
import homeIcon from '../ProductCard/components/img/Home.png';
import sliderLeft from '../ProductCard/components/img/slider-button-left.png';
import sliderRight from '../ProductCard/components/img/slider-button-right.png';
import arrowRight from '../CatalogPage/components/img/arrow-right.png';
import { Loader } from '../Loader/Loader';

interface Props {
  breadcrumbLabel: string;
  emptyMessage: string;
  fetchProducts: () => Promise<Product[]>;
  title: string;
}

export const CatalogPage: React.FC<Props> = ({
  breadcrumbLabel,
  emptyMessage,
  fetchProducts,
  title,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';

  // const visibleProducts = [...products];
  const normalizedQuery = query.trim().toLowerCase();

  const visibleProducts = products.filter(product =>
    product.name.toLowerCase().includes(normalizedQuery),
  );

  if (sort === 'age') {
    visibleProducts.sort((a, b) => b.year - a.year);
  } else if (sort === 'name') {
    visibleProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'price') {
    visibleProducts.sort((a, b) => a.price - b.price);
  }

  let preparedProducts = visibleProducts;

  if (perPage !== 'all') {
    const itemsPerPage = Number(perPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    preparedProducts = visibleProducts.slice(start, end);
  }

  const totalItems = visibleProducts.length;
  const itemsPerPage = perPage === 'all' ? totalItems : Number(perPage);
  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(totalItems / itemsPerPage);

  const pages: number[] = [];

  for (let page = 1; page <= totalPages; page++) {
    pages.push(page);
  }

  const pagesPerBlock = 4;
  const currentBlock = Math.floor((currentPage - 1) / pagesPerBlock);
  const startPage = currentBlock * pagesPerBlock;
  const visiblePages = pages.slice(startPage, startPage + pagesPerBlock);

  const setPage = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    setSearchParams(params);
  };

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    fetchProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchProducts]);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <>
        <p>Something went wrong...</p>

        <button type="button" onClick={() => window.location.reload()}>
          Reload
        </button>
      </>
    );
  }

  if (!products.length) {
    return <p>{emptyMessage}</p>;
  }

  const hasSearchQuery = normalizedQuery.length > 0;
  const hasNoSearchResults = hasSearchQuery && !visibleProducts.length;
  const noResultMessage = `There are no ${breadcrumbLabel.toLowerCase()} matching the query`;
  const shouldShowPagination = !hasNoSearchResults && totalPages > 1;

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/" className={styles.breadcrumbHome} aria-label="Home">
          <img className={styles.breadcrumbIcon} src={homeIcon} alt="Home" />
        </Link>

        <img
          className={styles.breadcrumbSeparator}
          src={arrowRight}
          alt="arrowRight"
        ></img>

        <span className={styles.breadcrumbCurrent}>{breadcrumbLabel}</span>
      </nav>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.count}>{visibleProducts.length} models</p>

      <div className={styles.selectors}>
        <label className={styles.field__one}>
          <span className={styles.fieldLabel}>Sort by</span>

          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={sort}
              onChange={event => {
                const value = event.target.value;
                const params = new URLSearchParams(searchParams);

                if (value) {
                  params.set('sort', value);
                } else {
                  params.delete('sort');
                }

                params.delete('page');
                setSearchParams(params);
              }}
            >
              <option value="age">Newest</option>
              <option value="name">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>

            <span className={styles.selectArrow} aria-hidden="true" />
          </div>
        </label>

        <label className={styles.field__two}>
          <span className={styles.fieldLabel}>Items on page</span>

          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={perPage}
              onChange={event => {
                const value = event.target.value;
                const params = new URLSearchParams(searchParams);

                if (value === 'all') {
                  params.delete('perPage');
                } else {
                  params.set('perPage', value);
                }

                params.delete('page');
                setSearchParams(params);
              }}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">All</option>
            </select>

            <span className={styles.selectArrow} aria-hidden="true" />
          </div>
        </label>
      </div>

      {hasNoSearchResults ? (
        <p className={styles.result__message}>{noResultMessage}</p>
      ) : (
        <ProductList products={preparedProducts} />
      )}

      {shouldShowPagination && (
        <nav className={styles.pagination} aria-label="Pagination">
          <button
            type="button"
            className={styles.paginationButton}
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            aria-label="Previous page"
          >
            <img className={styles.slider} src={sliderLeft} alt="SliderLeft" />
          </button>

          {visiblePages.map(page => (
            <button
              key={page}
              type="button"
              className={`${styles.paginationButton} ${
                currentPage === page ? styles.paginationButtonActive : ''
              }`}
              onClick={() => setPage(page)}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className={styles.paginationButton}
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
            aria-label="Next page"
          >
            <img
              className={styles.slider}
              src={sliderRight}
              alt="SliderRight"
            />
          </button>
        </nav>
      )}
    </div>
  );
};
