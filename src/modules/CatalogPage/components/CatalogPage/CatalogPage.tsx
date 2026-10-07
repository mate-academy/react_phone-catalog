import React, { useEffect, useState } from 'react';
import styles from './CatalogPage.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { getNumbersLength } from '../../../../utils/product';
import { Product } from '../../../../types/Product';
import { useProductsContext } from '../../../../hook/useProductsContext';
import { Loader } from '../../../shared/components/Loader/Loader';
import { ProductsList } from '../../../shared/components/ProductsList';

type Props = {
  products: Product[];
  category: 'Phones' | 'Tablets' | 'Accessories';
  title: string;
};

type SortOption = 'Newest' | 'Alphabetically' | 'Cheapest';

function getLimitFromUrl(value: string | null): 'all' | 4 | 8 | 16 {
  switch (value) {
    case '4':
      return 4;

    case '8':
      return 8;

    case '16':
      return 16;

    default:
      return 'all';
  }
}

function getSortFromUrl(value: string | null): SortOption {
  switch (value) {
    case 'price':
      return 'Cheapest';

    case 'title':
      return 'Alphabetically';

    case 'age':
      return 'Newest';

    default:
      return 'Newest';
  }
}

function getSortParam(sort: SortOption): 'age' | 'title' | 'price' {
  if (sort === 'Newest') {
    return 'age';
  } else if (sort === 'Alphabetically') {
    return 'title';
  }

  return 'price';
}

function getPageFromUrl(value: string | null) {
  const num = Number(value);

  if (num < 1 || !Number.isInteger(num)) {
    return 1;
  }

  return num;
}

export const CatalogPage: React.FC<Props> = ({ products, category, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, hasError } = useProductsContext();

  const pageFromUrl = getPageFromUrl(searchParams.get('page'));
  const limitFromUrl = getLimitFromUrl(searchParams.get('perPage'));
  const sortFromUrl = getSortFromUrl(searchParams.get('sort'));

  const query = searchParams.get('query')?.trim().toLowerCase() ?? '';

  const productsMatchingQuery = products.filter(product => {
    return product.name.toLowerCase().includes(query);
  });

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const initialFirstVisiblePage = Math.floor((pageFromUrl - 1) / 4) * 4 + 1;

  const [firstVisiblePage, setFirstVisiblePage] = useState(
    initialFirstVisiblePage,
  );

  const [valueSort, setValueSort] = useState<SortOption>(sortFromUrl);
  const [valueLimit, setValueLimit] = useState<'all' | 4 | 8 | 16>(
    limitFromUrl,
  );

  const sortedProducts = [...productsMatchingQuery].sort(
    (product1, product2) => {
      switch (valueSort) {
        case 'Alphabetically':
          return product1.name.localeCompare(product2.name);

        case 'Cheapest':
          return product1.price - product2.price;

        case 'Newest':
          return product2.year - product1.year;
      }
    },
  );

  const maxPage =
    valueLimit === 'all' ? 1 : Math.ceil(sortedProducts.length / valueLimit);

  const startIndex = valueLimit === 'all' ? 0 : (currentPage - 1) * valueLimit;

  const endIndex =
    valueLimit === 'all' ? sortedProducts.length : startIndex + valueLimit;

  const filteredProductsPage = sortedProducts.slice(startIndex, endIndex);

  const numberPage = Array.from({ length: maxPage }, getNumbersLength);
  const visiblePages = numberPage.slice(
    firstVisiblePage - 1,
    firstVisiblePage + 3,
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);

    setSearchParams(currentParams => {
      const newParams = new URLSearchParams(currentParams);

      if (page === 1) {
        newParams.delete('page');
      } else {
        newParams.set('page', String(page));
      }

      return newParams;
    });
  }

  function handleLimitChange(limit: 'all' | 4 | 8 | 16) {
    setValueLimit(limit);
    setCurrentPage(1);
    setFirstVisiblePage(1);

    setSearchParams(currentParams => {
      const newParams = new URLSearchParams(currentParams);

      newParams.delete('page');

      if (limit === 'all') {
        newParams.delete('perPage');
      } else {
        newParams.set('perPage', String(limit));
      }

      return newParams;
    });
  }

  function handleSortChange(sort: SortOption) {
    setValueSort(sort);
    setCurrentPage(1);
    setFirstVisiblePage(1);

    setSearchParams(currentParams => {
      const newParams = new URLSearchParams(currentParams);

      newParams.set('sort', getSortParam(sort));

      newParams.delete('page');

      return newParams;
    });
  }

  useEffect(() => {
    if (maxPage === 0 || pageFromUrl <= maxPage) {
      return;
    }

    setSearchParams(currentParams => {
      const newParams = new URLSearchParams(currentParams);

      if (maxPage <= 1) {
        newParams.delete('page');
      } else {
        newParams.set('page', String(maxPage));
      }

      return newParams;
    });
  }, [pageFromUrl, maxPage, setSearchParams]);

  useEffect(() => {
    setCurrentPage(pageFromUrl);
    setFirstVisiblePage(initialFirstVisiblePage);
    setValueLimit(limitFromUrl);
    setValueSort(sortFromUrl);
  }, [pageFromUrl, initialFirstVisiblePage, limitFromUrl, sortFromUrl]);

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className={`${styles.error} container`}>
        <h1 className={styles.error__title}>Something went wrong</h1>
        <button
          type="button"
          className={styles.error__button}
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.products} container`}>
      <div className={styles.breadcrumbs}>
        <ul className={styles.breadcrumbs__list}>
          <li className={styles.breadcrumbs__item}>
            <Link to="/" className={styles.breadcrumbs__link}>
              <img
                src="./img/home.png"
                alt=""
                className={styles.breadcrumbs__img}
              />
            </Link>
          </li>

          <li className={styles.breadcrumbs__item}>
            <img
              src="./img/arrRight.png"
              alt=""
              className={styles.breadcrumbs__icon}
            />
          </li>

          <li className={styles.breadcrumbs__item}>
            <span className={styles.breadcrumbs__page}>{category}</span>
          </li>
        </ul>
      </div>

      <h1 className={styles.products__title}>{title}</h1>

      <p className={styles.products__count}>{`${products.length} models`}</p>

      {productsMatchingQuery.length === 0 ? (
        <p
          className={styles['products--none']}
        >{`There are no ${category.toLowerCase()} ${query ? 'matching the query' : 'yet'}`}</p>
      ) : (
        <>
          <div className={styles['catalog-panel']}>
            <div className={styles['catalog-panel__sort']}>
              <label
                htmlFor="sort"
                className={styles['catalog-panel__sort-title']}
              >
                Sort by
              </label>

              <div className={`${styles.dropdown} ${styles.dropdown__sort}`}>
                <select
                  id="sort"
                  className={styles.dropdown__select}
                  value={getSortParam(valueSort)}
                  onChange={event => {
                    handleSortChange(getSortFromUrl(event.target.value));
                  }}
                >
                  <option value="age">Newest</option>
                  <option value="title">Alphabetically</option>
                  <option value="price">Cheapest</option>
                </select>
              </div>
            </div>

            <div className={styles['catalog-panel__limit']}>
              <label
                htmlFor="per-page"
                className={styles['catalog-panel__limit-title']}
              >
                Items on page
              </label>

              <div className={`${styles.dropdown} ${styles.dropdown__limit}`}>
                <select
                  id="per-page"
                  className={styles.dropdown__select}
                  value={String(valueLimit)}
                  onChange={event => {
                    handleLimitChange(getLimitFromUrl(event.target.value));
                  }}
                >
                  <option value="all">all</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                </select>
              </div>
            </div>
          </div>

          <ProductsList products={filteredProductsPage} />

          {maxPage <= 1 ? null : (
            <div className={styles.pagination}>
              <button
                className={styles['pagination__button-arrow']}
                disabled={firstVisiblePage === 1}
                onClick={() => {
                  const prevPage = firstVisiblePage - 4;

                  if (prevPage < 1) {
                    return;
                  }

                  setFirstVisiblePage(prevPage);
                  handlePageChange(prevPage);
                }}
              >
                <img
                  src="./img/arrLeft.png"
                  alt=""
                  className={styles.pagination__icon}
                />
              </button>

              <div className={styles['pagination__button-pages']}>
                {visiblePages.map(num => (
                  <button
                    key={num}
                    className={`${styles.pagination__button} ${
                      currentPage === num
                        ? styles['pagination__button-active']
                        : ''
                    }`}
                    onClick={() => handlePageChange(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button
                className={styles['pagination__button-arrow']}
                disabled={maxPage < firstVisiblePage + 4}
                onClick={() => {
                  const nextPage = firstVisiblePage + 4;

                  if (nextPage > maxPage) {
                    return;
                  }

                  setFirstVisiblePage(nextPage);
                  handlePageChange(nextPage);
                }}
              >
                <img
                  src="./img/arrRight.png"
                  alt=""
                  className={styles.pagination__icon}
                />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
