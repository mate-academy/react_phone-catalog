import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './ProductPage.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductList } from '../shared/ProductList/ProductList';
import { useGlobalState } from '../../context/store';
import { capitalizeFirstCharacter } from '../../utils/capitalizeFirstCharacter';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { getPreparedProducts } from '../../utils/getPreparedProducts';
import { SortOptions } from '../../types/SortOptions';
import { Dropdown } from '../shared/Dropdown/Dropdown';
import { PerPageOptions } from '../../types/PerPageOptions';
import { Pagination } from '../shared/Pagination';
import { ProductPageSkeleton } from './ProductPageSkeleton';
import { useTranslation } from 'react-i18next';
import { getSearch } from '../../utils/getSearchWith';
import debounce from 'lodash.debounce';

export const ProductPage: FC = () => {
  const { products, isLoading, errorMessage, fetchProducts } = useGlobalState();
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = (searchParams.get('sort') as SortOptions) || SortOptions.Newest;
  const query = searchParams.get('query') || '';
  const perPage =
    (searchParams.get('perPage') as PerPageOptions) || PerPageOptions.All;
  const page = +(searchParams.get('page') || 1);

  const [appliedQuery, setAppliedQuery] = useState(query);

  // update query when the URL changes
  useEffect(() => {
    setAppliedQuery(query);
  }, [query]);

  const applyQuery = useMemo(
    () =>
      debounce((value: string) => {
        setSearchParams(getSearch({ query: value || null }, searchParams));
      }, 1000),
    [setSearchParams, searchParams],
  );

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const queryValue = e.target.value;

    setAppliedQuery(queryValue);

    applyQuery(queryValue);
  };

  const clearInput = useCallback(() => {
    setAppliedQuery('');

    applyQuery('');
  }, [applyQuery]);

  const { pathname } = useLocation();
  const category = pathname.split('/')[1];
  const pageTitle = capitalizeFirstCharacter(category);

  const categoryProducts = useMemo(
    () => products.filter(product => product.category === category),
    [category, products],
  );

  const visibleProducts = useMemo(
    () => getPreparedProducts(categoryProducts, sort, query),
    [categoryProducts, sort, query],
  );

  const perPageInNumbers =
    perPage === PerPageOptions.All ? visibleProducts.length : Number(perPage);

  const totalPages = useMemo(
    () =>
      perPage === PerPageOptions.All
        ? 1
        : Math.ceil(categoryProducts.length / perPageInNumbers),
    [categoryProducts.length, perPage, perPageInNumbers],
  );

  const startIndex = (page - 1) * perPageInNumbers;

  const productsOnPage = useMemo(
    () =>
      perPage === PerPageOptions.All
        ? visibleProducts
        : visibleProducts.slice(startIndex, startIndex + perPageInNumbers),
    [perPage, perPageInNumbers, startIndex, visibleProducts],
  );

  return (
    <div className={styles.container}>
      {isLoading && <ProductPageSkeleton />}

      {!isLoading && errorMessage && (
        <div className={styles.errorWrapper}>
          <div className={styles.errorMessage}>{errorMessage}</div>

          <button
            className={styles.reloadButton}
            onClick={fetchProducts}
            disabled={isLoading}
          >
            Try reload
          </button>
        </div>
      )}

      {!isLoading && !errorMessage && productsOnPage.length === 0 && (
        <div className={styles.errorWrapper}>
          <div className={styles.errorMessage}>
            {`There are no ${category} yet`}
          </div>
        </div>
      )}

      {!isLoading && !errorMessage && productsOnPage.length > 0 && (
        <>
          <div className={styles.breadcrumbs}>
            <Breadcrumbs />
          </div>

          <h1 className={styles.pageTitle}>{pageTitle}</h1>

          <div
            className={styles.productsAmount}
          >{`${categoryProducts.length} ${t('models')}`}</div>

          <div className={styles.dropdownsSearchWrapper}>
            <div className={styles.dropdowns}>
              <div className={styles.dropdownSort}>
                <Dropdown
                  label={t('dropdownLabel.sort')}
                  value={sort}
                  options={Object.values(SortOptions)}
                  paramsToUpdate={value => ({ sort: value })}
                ></Dropdown>
              </div>

              <div className={styles.dropdownPerPage}>
                <Dropdown
                  label={t('dropdownLabel.items')}
                  value={perPage}
                  options={Object.values(PerPageOptions)}
                  paramsToUpdate={value => ({ perPage: value })}
                ></Dropdown>
              </div>
            </div>

            <div className={styles.searchWrapper}>
              <span className={styles.searchIcon}></span>

              <input
                type="text"
                name="search"
                value={appliedQuery}
                className={styles.searchInput}
                onChange={handleQueryChange}
                placeholder="Search products..."
              />

              {appliedQuery && (
                <button
                  className={styles.searchClear}
                  onClick={clearInput}
                  aria-label="Clear search"
                />
              )}
            </div>
          </div>

          <div className={styles.productList}>
            <ProductList products={productsOnPage} />
          </div>

          {perPage !== PerPageOptions.All && totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} />
          )}
        </>
      )}
    </div>
  );
};
