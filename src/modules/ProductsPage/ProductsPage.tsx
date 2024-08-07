import { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Select, { StylesConfig } from 'react-select';
import styles from './ProductsPage.module.scss';
import { ProductsList } from '../shared/components/ProductsList';
import { Link } from 'react-router-dom';
import { getProducts } from '../shared/api';
import { Product } from '../shared/types';
import { Pagination } from '../shared/components/Pagination';

const sortByOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const onPageOptions = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

const customStyles: StylesConfig = {
  dropdownIndicator: (base, state) => ({
    ...base,
    transition: `0.2s`,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
  }),

  control: (base, state) => ({
    ...base,
    border: state.selectProps.menuIsOpen
      ? '1px solid #313237 !important'
      : undefined,
  }),
};

export const ProductsPage = () => {
  const { pathname } = useLocation();
  const [goods, setGoods] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [preparedProducts, setPreparedProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams(
    `?sort=${sortByOptions[0].value}&page=1&perPage=${onPageOptions[3].value}`,
  );

  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';
  const currentPage = searchParams.get('page') || '';
  const reloadPage = () => {
    window.location.reload();
  };

  const onChangeSortBy = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newValue: any) => {
      const params = new URLSearchParams(searchParams);

      params.set('sort', newValue.value);

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const getValueSortBy = useCallback(() => {
    return sort ? sortByOptions.find(s => s.value === sort) : '';
  }, [sort]);

  const onChangeOnPage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (newValue: any) => {
      const params = new URLSearchParams(searchParams);

      params.set('perPage', newValue.value);

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const getValueOnPage = useCallback(() => {
    return perPage ? onPageOptions.find(s => s.value === perPage) : '';
  }, [perPage]);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(responce => {
        setGoods(responce);
      })
      .catch(() => setErrorMessage(`Something went wrong`))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (pathname === '/phones') {
      setProducts(
        goods.filter(
          (product: { category: string }) => product.category === 'phones',
        ),
      );
    } else if (pathname === '/tablets') {
      setProducts(
        goods.filter(
          (product: { category: string }) => product.category === 'tablets',
        ),
      );
    } else if (pathname === '/accessories') {
      setProducts(
        goods.filter(
          (product: { category: string }) => product.category === 'accessories',
        ),
      );
    }
  }, [goods, pathname]);

  useEffect(() => {
    let sortedProducts = [...products];

    if (sort === 'age') {
      sortedProducts = sortedProducts.sort((a, b) => b.year - a.year);
    } else if (sort === 'title') {
      sortedProducts = sortedProducts.sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    } else if (sort === 'price') {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    }

    setPreparedProducts(sortedProducts);
  }, [products, sort]);

  const lastProductsIndex = +currentPage * +perPage;
  const firstProductsIdex = lastProductsIndex - +perPage;
  const currentProduct =
    perPage != 'all'
      ? preparedProducts.slice(firstProductsIdex, lastProductsIndex)
      : preparedProducts;

  const paginate = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams);

      params.set('page', `${pageNumber}`);

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const nextPage = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    params.set('page', `${+currentPage + 1}`);

    setSearchParams(params);
  }, [currentPage, searchParams, setSearchParams]);

  const prevPage = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    params.set('page', `${+currentPage - 1}`);

    setSearchParams(params);
  }, [currentPage, searchParams, setSearchParams]);

  return errorMessage ? (
    <div className={styles.reloadContainer}>
      <h1 className={styles.errorMsg}>{errorMessage}</h1>
      <button className={styles.reloadBtn} onClick={reloadPage}>
        Reload
      </button>
    </div>
  ) : (
    <div className={styles.productsPageContainer}>
      <div className={styles.productsPage}>
        <div className={styles.path}>
          <Link to="/" className={styles.homeLink}>
            <div className={styles.pathHome}></div>
          </Link>

          <div className={styles.pathSeparator}></div>
          {pathname === '/phones' && <p className={styles.pathName}>Phones</p>}

          {pathname === '/tablets' && (
            <p className={styles.pathName}>Tablets</p>
          )}

          {pathname === '/accessories' && (
            <p className={styles.pathName}>Accessories</p>
          )}
        </div>

        {pathname === '/phones' && (
          <h1 className={styles.title}>Mobile phones</h1>
        )}

        {pathname === '/tablets' && <h1 className={styles.title}>Tablets</h1>}

        {pathname === '/accessories' && (
          <h1 className={styles.title}>Accessories</h1>
        )}

        <p className={styles.counter}>{products.length} models</p>

        <div className={styles.dropDowns}>
          <div className={styles.dropDownContainerSortBy}>
            <p className={styles.dropDownTitle}>Sort by</p>
            <Select
              options={sortByOptions}
              onChange={onChangeSortBy}
              value={getValueSortBy()}
              isSearchable={false}
              styles={customStyles}
            />
          </div>

          <div className={styles.dropDownContainerOnPage}>
            <p className={styles.dropDownTitle}>Items on page</p>
            <Select
              options={onPageOptions}
              onChange={onChangeOnPage}
              value={getValueOnPage()}
              isSearchable={false}
              styles={customStyles}
            />
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loaderContainer}>
            <img
              src="./img/icons/loader-spinner.gif"
              className={styles.loaderSpinner}
              alt="loader animation"
            />
          </div>
        ) : products.length === 0 ? (
          pathname === '/phones' ? (
            <h1 className={styles.noProductsMessage}>
              There are no phones yet
            </h1>
          ) : pathname === '/tablets' ? (
            <h1 className={styles.noProductsMessage}>
              There are no tablets yet
            </h1>
          ) : (
            pathname === '/accessories' && (
              <h1 className={styles.noProductsMessage}>
                There are no accessories yet
              </h1>
            )
          )
        ) : (
          <>
            <ProductsList products={currentProduct} />
            {perPage != 'all' && (
              <Pagination
                productsPerPage={perPage}
                totalProducts={preparedProducts.length}
                currentPage={currentPage}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
