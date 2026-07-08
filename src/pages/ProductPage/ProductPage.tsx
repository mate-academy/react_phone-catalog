import { useParams, useSearchParams } from 'react-router-dom';
import { NotFoundPage } from '../NotFoundPage';
import { ProductType } from '../../types/ProductType';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../api';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ProductsList } from '../../components/ProductsList';
import styles from './ProductPage.module.scss';
import { Loader } from '../../components/Loader';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { SortOptions } from '../../types/SortOptions';
import { ButtonArrow } from '../../components/ButtonArrow';
import { SearchContext } from '../../context/SearchContext';

function isProductType(value: string): value is ProductType {
  return (Object.values(ProductType) as string[]).includes(value);
}

const MAX_VISIBLE_PAGES = 4;

export const ProductPage = () => {
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [pageProducts, setPageProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') ?? SortOptions.Newest;
  const page = Number(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage') || 'all';
  const query = searchParams.get('query') || '';
  const normalizedQuery = query.toLowerCase().trim();
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error('Must be used within a SearchProvider');
  }

  const { setSearchVisible } = searchContext;

  const perPageOptions = ['4', '8', '16', 'all'];

  const fetchData = () => {
    if (!type || !isProductType(type)) {
      return;
    }

    setLoading(true);
    getProducts(type)
      .then(setPageProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  const { visibleProducts, totalPages } = useMemo(() => {
    const products = [...pageProducts].filter(
      product =>
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery),
    );
    const perPageNumber = perPage === 'all' ? null : Number(perPage);
    const startIndex = perPageNumber ? perPageNumber * (page - 1) : 0;
    const endIndex = perPageNumber ? startIndex + perPageNumber : undefined;

    switch (sort) {
      case SortOptions.Alphabetically:
        products.sort((prodA, prodB) => prodA.name.localeCompare(prodB.name));
        break;

      case SortOptions.Cheapest:
        products.sort((prodA, prodB) => prodA.price - prodB.price);
        break;

      default:
        products.sort((prodA, prodB) => prodB.year - prodA.year);
        break;
    }

    const listOfProducts = perPageNumber
      ? products.slice(startIndex, endIndex)
      : products;

    const pagesCount = perPageNumber
      ? Math.ceil(products.length / perPageNumber)
      : 1;

    return {
      visibleProducts: listOfProducts,
      totalPages: pagesCount,
    };
  }, [sort, pageProducts, page, perPage, query]);

  const isSuccess = !loading && !error && pageProducts.length > 0;

  useEffect(() => {
    setSearchVisible(isSuccess);
  }, [isSuccess]);

  useEffect(() => {
    return () => setSearchVisible(false);
  }, []);

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    const isDefault =
      (key === 'page' && value === '1') ||
      (key === 'perPage' && value === 'all');

    if (isDefault) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    if (key === 'perPage') {
      params.delete('page');
    }

    setSearchParams(params);
  }

  if (!type || !isProductType(type)) {
    return <NotFoundPage />;
  }

  const capitalize = type[0].toUpperCase() + type.slice(1);

  const breadCrumbsElements = [
    { label: 'Home', path: '/' },
    { label: capitalize },
  ];

  const pageStart = Math.max(1, page - (MAX_VISIBLE_PAGES - 1));
  const pageEnd = Math.min(totalPages, pageStart + MAX_VISIBLE_PAGES - 1);
  const windowLength = pageEnd - pageStart + 1;
  const visiblePages = Array.from(
    { length: windowLength },
    (_, i) => pageStart + i,
  );

  return (
    <section className={styles.productsContainer}>
      <div className={styles.breadCrumbs}>
        <BreadCrumbs elements={breadCrumbsElements} />
      </div>
      {loading && <Loader />}

      {error && <ErrorMessage onReload={() => fetchData()} />}

      {(!isSuccess || (isSuccess && visibleProducts.length === 0)) && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>
            {!isSuccess
              ? `There are no ${type} yet`
              : `There are no ${type} products matching the query`}
          </p>
          <img
            className={styles.notFoundImg}
            src="/img/product-not-found.png"
            alt="Products is not found"
          />
        </div>
      )}

      {isSuccess && visibleProducts.length > 0 && (
        <>
          <div className={styles.wrapper}>
            <div className={styles.topContainer}>
              <h1 className={styles.title}>{`${capitalize} page`}</h1>

              <p
                className={styles.infoProducts}
              >{`${pageProducts.length} models`}</p>
            </div>

            <div className={styles.selectorsBlock}>
              <label className={styles.label}>
                Sort by
                <select
                  className={`${styles.selector} ${styles.sortBy}`}
                  value={sort}
                  onChange={e => updateParams('sort', e.target.value)}
                >
                  {Object.entries(SortOptions).map(([key, value]) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.label}>
                Items on page
                <select
                  className={`${styles.selector} ${styles.pagination}`}
                  value={perPage}
                  onChange={e => updateParams('perPage', e.target.value)}
                >
                  {perPageOptions.map(el => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className={styles.productsList}>
            <ProductsList productItems={visibleProducts} />
          </div>

          <div className={styles.pageButtons}>
            <ButtonArrow
              onClick={() => updateParams('page', (page - 1).toString())}
              disabled={page === 1}
              direction="left"
            />

            {visiblePages.map(p => (
              <button
                key={p}
                className={`${styles.pageButton} ${p === page ? styles.active : ''}`}
                onClick={() => updateParams('page', p.toString())}
              >
                {p}
              </button>
            ))}

            {pageEnd < totalPages && (
              <button className={`${styles.pageButton} ${styles.dots}`}>
                ...
              </button>
            )}

            <ButtonArrow
              onClick={() => updateParams('page', (page + 1).toString())}
              disabled={page === totalPages}
              direction="right"
            />
          </div>
        </>
      )}
    </section>
  );
};
