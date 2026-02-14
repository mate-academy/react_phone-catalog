import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Category } from '../../types/Category';
import { Pagination } from './components/Pagination/Pagination';
import { ProductsList } from './components/ProductsList';
import { Dropdown } from './components/Dropdown';
import styles from './ProductPage.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { getFilteredProducts } from '../../utils/getFilteredProducts';
import { getProductsByCategory } from '../../utils/getProductsByCategory';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Product } from '../../types/Product';
import { getNewParams } from '../../utils/getNewParams';
import { Params } from '../../types/Params';
import { LoaderErrorWrapper } from '../../components/LoaderErrorWrapper';
import { init } from '../../store/products/productsSlice';
import { useEffect } from 'react';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const ProductPage = () => {
  const { products, loading, error } = useAppSelector(state => state.products);
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const itemCategory = category as Category;
  const productsInCategory = getProductsByCategory(products, itemCategory);
  const itemsAmount = productsInCategory.length;

  const setNewSearchParams = (params: Params) => {
    const newParams = getNewParams(params, searchParams);

    setSearchParams(newParams);
  };

  const defaultParams = {
    sortField: 'year',
    count: `${itemsAmount}`,
    page: '1',
  };

  const sortOptions = {
    [defaultParams.sortField]: 'Newest',
    name: 'Alpabetically',
    price: 'Cheapest',
  };

  const perPageOptions = {
    '4': '4',
    '8': '8',
    '16': '16',
    [defaultParams.count]: 'All',
  };

  const getParam = (
    param: string,
    options: Record<string, string>,
    defaultValue: string,
  ): string => {
    const property = searchParams.get(param);

    if (property && Object.hasOwn(options, property)) {
      return property;
    }

    return defaultValue;
  };

  const sortField = getParam('sortField', sortOptions, defaultParams.sortField);
  const itemsPerPage = +getParam(
    'itemsPerPage',
    perPageOptions,
    defaultParams.count,
  );
  const checkPage = (val: string | null) => {
    if (val) {
      const num = +val;

      if (
        Number.isInteger(num) &&
        num >= 1 &&
        num <= Math.ceil(itemsAmount / +itemsPerPage)
      ) {
        return num;
      }
    }

    return +defaultParams.page;
  };

  const page = checkPage(searchParams.get('page'));

  const filteredProducts = getFilteredProducts(productsInCategory, sortField);

  const getVisibleProducts = (
    items: Product[],
    currPage: number,
    perPage: number,
  ) => {
    const end = currPage * perPage;
    const start = end - perPage;

    return [...items].slice(start, end);
  };

  const visibleProducts = getVisibleProducts(
    filteredProducts,
    page,
    itemsPerPage,
  );

  const setSortField = (value: string) => {
    setNewSearchParams({
      sortField: value === defaultParams.sortField ? null : value,
      page: null,
    });
  };

  const setItemsPerPage = (value: string) => {
    setNewSearchParams({
      itemsPerPage: value === defaultParams.count ? null : value,
      page: null,
    });
  };

  const setPage = (pageNum: string) => {
    setNewSearchParams({
      page: !pageNum.localeCompare(defaultParams.page) ? null : pageNum,
    });
  };

  useEffect(() => {
    dispatch(init());
  }, [dispatch, category]);

  useScrollToTop();

  return (
    <main className={styles['product-page']}>
      <LoaderErrorWrapper
        loading={loading}
        error={error}
        reload={() => {
          dispatch(init());
        }}
      >
        <div className={styles['product-page__top']}>
          <div className={styles['product-page__breadcrumbs']}>
            <Breadcrumbs />
          </div>

          <h1 className={styles['product-page__title']}>{itemCategory}</h1>

          <p className={styles['product-page__models']}>{itemsAmount} models</p>
        </div>

        {!filteredProducts.length ? (
          <h2 className={styles['product-page__message']}>
            There are no {itemCategory} yet
          </h2>
        ) : (
          <>
            <div className={styles['product-page__filters']}>
              <div className={styles['product-page__select']}>
                <p className={styles['product-page__label']}>Sort by</p>
                <Dropdown
                  options={sortOptions}
                  setOption={setSortField}
                  value={sortOptions[sortField]}
                />
              </div>
              <div className={styles['product-page__select']}>
                <p className={styles['product-page__label']}>Items on page</p>
                <Dropdown
                  options={perPageOptions}
                  setOption={setItemsPerPage}
                  value={perPageOptions[itemsPerPage]}
                />
              </div>
            </div>

            <ProductsList products={visibleProducts} />

            <div className={styles['product-page__pagination']}>
              <Pagination
                items={itemsAmount}
                perPage={itemsPerPage}
                currentPage={page}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </LoaderErrorWrapper>
    </main>
  );
};
