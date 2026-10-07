import styles from './ProductsPage.module.scss';

import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { getProducts } from '../../api/products';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../../types/Product';

type CategoryPath = '/phones' | '/tablets' | '/accessories';

type Sort = 'age' | 'title' | 'price';

type PerPage = '4' | '8' | '16' | 'all';

const categoryNames = {
  '/phones': {
    breadcrumb: 'Phones',
    title: 'Mobile phones',
    category: 'phones',
  },
  '/tablets': {
    breadcrumb: 'Tablets',
    title: 'Tablets',
    category: 'tablets',
  },
  '/accessories': {
    breadcrumb: 'Accessories',
    title: 'Accessories',
    category: 'accessories',
  },
};

const sortNames = {
  age: 'Newest',
  title: 'Alphabetically',
  price: 'Cheapest',
};

const perPageNames = {
  '4': '4',
  '8': '8',
  '16': '16',
  all: 'All',
};

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const data = await getProducts();

      setProducts(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts, location.pathname]);

  const categoryName = categoryNames[location.pathname as CategoryPath];

  const categoryProducts = products.filter(
    product => product.category === categoryName.category,
  );

  const sortParam = searchParams.get('sort');

  const sort: Sort =
    sortParam === 'age' || sortParam === 'title' || sortParam === 'price'
      ? sortParam
      : 'age';

  const sortedProducts = [...categoryProducts];

  if (sort === 'age') {
    sortedProducts.sort((a, b) => b.year - a.year);
  }

  if (sort === 'title') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === 'price') {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  const perPageParam = searchParams.get('perPage');

  const perPage: PerPage =
    perPageParam === '4' ||
    perPageParam === '8' ||
    perPageParam === '16' ||
    perPageParam === 'all'
      ? perPageParam
      : 'all';

  const pageParam = Number(searchParams.get('page'));

  const currentPage =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const productsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);

  const totalPages =
    productsPerPage > 0
      ? Math.ceil(sortedProducts.length / productsPerPage)
      : 1;

  const firstProductIndex = (currentPage - 1) * productsPerPage;

  let visibleProducts = sortedProducts;

  if (perPage !== 'all') {
    visibleProducts = sortedProducts.slice(
      firstProductIndex,
      firstProductIndex + productsPerPage,
    );
  }

  const updateSearchParams = (
    newSort: Sort = sort,
    newPerPage: PerPage = perPage,
    newPage = 1,
  ) => {
    const params = new URLSearchParams();

    if (newSort !== 'age') {
      params.set('sort', newSort);
    }

    if (newPerPage !== 'all') {
      params.set('perPage', newPerPage);
    }

    if (newPage !== 1) {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
  };

  const changePage = (page: number) => {
    updateSearchParams(sort, perPage, page);
  };

  return (
    <section className={styles.products_page}>
      {isLoading ? (
        <Loader />
      ) : hasError ? (
        <div className={styles.products_page__error}>
          <p>Something went wrong</p>

          <button type="button" onClick={loadProducts}>
            Reload
          </button>
        </div>
      ) : (
        <>
          <div className={styles.products_page__breadcrumbs}>
            <Link to="/" className={styles.products_page__breadcrumbs__link}>
              <img src="/img/icons/home.svg" alt="home" />
            </Link>

            <img
              className={styles.products_page__breadcrumbs__img_right}
              src="/img/icons/right.svg"
              alt=""
            />

            <span className={styles.products_page__breadcrumbs__category}>
              {categoryName.breadcrumb}
            </span>
          </div>

          <h1 className={styles.products_page__title}>{categoryName.title}</h1>

          <p className={styles.products_page__text}>
            {categoryProducts.length} models
          </p>

          <div className={styles.products_page__filters}>
            <div className={styles.products_page__filters__text}>
              <span className={styles.products_page__filters__text__label}>
                Sort by
              </span>

              <div className={styles.products_page__filters__text__dropdown}>
                <button
                  type="button"
                  className={
                    styles.products_page__filters__text__dropdown__button
                  }
                  onClick={() => {
                    setIsSortOpen(!isSortOpen);
                    setIsPerPageOpen(false);
                  }}
                >
                  {sortNames[sort]}

                  <img
                    className={
                      styles.products_page__filters__text__dropdown__button__img
                    }
                    src={`/img/icons/${isSortOpen ? 'up' : 'down'}.svg`}
                    alt=""
                  />
                </button>

                {isSortOpen && (
                  <div
                    className={
                      styles.products_page__filters__text__dropdown__menu
                    }
                  >
                    <button
                      type="button"
                      className={`${styles.products_page__filters__text__dropdown__menu__option} ${
                        sort === 'age' ? styles.active : ''
                      }`}
                      onClick={() => {
                        updateSearchParams('age', perPage, 1);
                        setIsSortOpen(false);
                      }}
                    >
                      Newest
                    </button>

                    <button
                      type="button"
                      className={`${styles.products_page__filters__text__dropdown__menu__option} ${
                        sort === 'title' ? styles.active : ''
                      }`}
                      onClick={() => {
                        updateSearchParams('title', perPage, 1);
                        setIsSortOpen(false);
                      }}
                    >
                      Alphabetically
                    </button>

                    <button
                      type="button"
                      className={`${styles.products_page__filters__text__dropdown__menu__option} ${
                        sort === 'price' ? styles.active : ''
                      }`}
                      onClick={() => {
                        updateSearchParams('price', perPage, 1);
                        setIsSortOpen(false);
                      }}
                    >
                      Cheapest
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.products_page__filters__number}>
              <span className={styles.products_page__filters__number__label}>
                Items on page
              </span>

              <div className={styles.products_page__filters__number__dropdown}>
                <button
                  type="button"
                  className={
                    styles.products_page__filters__number__dropdown__button
                  }
                  onClick={() => {
                    setIsPerPageOpen(!isPerPageOpen);
                    setIsSortOpen(false);
                  }}
                >
                  {perPageNames[perPage]}

                  <img
                    className={
                      // eslint-disable-next-line max-len
                      styles.products_page__filters__number__dropdown__button__img
                    }
                    src={`/img/icons/${isPerPageOpen ? 'up' : 'down'}.svg`}
                    alt=""
                  />
                </button>

                {isPerPageOpen && (
                  <div
                    className={
                      styles.products_page__filters__number__dropdown__menu
                    }
                  >
                    <button
                      type="button"
                      className={`${styles.products_page__filters__number__dropdown__menu__option} ${perPage === '4' ? styles.active : ''}`}
                      onClick={() => {
                        updateSearchParams(sort, '4', 1);
                        setIsPerPageOpen(false);
                      }}
                    >
                      4
                    </button>

                    <button
                      type="button"
                      className={`${styles.products_page__filters__number__dropdown__menu__option} ${perPage === '8' ? styles.active : ''}`}
                      onClick={() => {
                        updateSearchParams(sort, '8', 1);
                        setIsPerPageOpen(false);
                      }}
                    >
                      8
                    </button>

                    <button
                      type="button"
                      className={`${styles.products_page__filters__number__dropdown__menu__option} ${
                        perPage === '16' ? styles.active : ''
                      }`}
                      onClick={() => {
                        updateSearchParams(sort, '16', 1);
                        setIsPerPageOpen(false);
                      }}
                    >
                      16
                    </button>

                    <button
                      type="button"
                      className={`${styles.products_page__filters__number__dropdown__menu__option} ${perPage === 'all' ? styles.active : ''}`}
                      onClick={() => {
                        updateSearchParams(sort, 'all', 1);
                        setIsPerPageOpen(false);
                      }}
                    >
                      All
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {visibleProducts.length > 0 ? (
            <ProductsList products={visibleProducts} />
          ) : (
            <p className={styles.products_page__error}>
              There are no {categoryName.category} yet
            </p>
          )}

          {perPage !== 'all' && totalPages > 1 && (
            <div className={styles.products_page__pagination}>
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
              >
                <img
                  className={styles.products_page__pagination__img_left}
                  src="/img/icons/left.svg"
                  alt="Left page"
                />
              </button>

              <div className={styles.products_page__pagination__pages}>
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      type="button"
                      key={page}
                      className={`${styles.products_page__pagination__pages__option} ${currentPage === page ? styles.pagination_active : ''}`}
                      onClick={() => changePage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
              >
                <img
                  className={styles.products_page__pagination__img_right}
                  src="/img/icons/right.svg"
                  alt="right page"
                />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};
