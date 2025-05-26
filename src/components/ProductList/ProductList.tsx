import { useAppDispatch, useAppSelector } from '../../hooks/helperToolkit';
import { Card } from '../Card';
import styles from './ProductList.module.scss';
import productNotFound from '../../../public/img/product-not-found.png';
import { usePagination } from '../../hooks/usePagination';
import { Pagination } from '../Pagination';
import { SortTypes } from '../../types/sort';
import { Sort } from '../Sort';
import {
  fetchDevicesList,
  setProductsPerPage,
  setSortType,
} from '../../slices/deviceSlice';
import { PerPage } from '../../types/perPage';
import {
  ITEMS_PER_PAGE,
  SORT_OPTIONS,
  DEFAULT_SORT,
  DEFAULT_PER_PAGE,
} from '../../constants/constJS';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  parsePerPage,
  updateSearchParamsWithDefaults,
} from '../../utils/searchParamsUtils';
import { useSortedProducts } from '../../hooks/useSortedProducts';
import { useFetchDevices } from '../../hooks/useFetchDevices';
import { EmptyState } from '../EmptyState';

export const ProductList = ({ title }: { title: string }) => {
  const { category } = useParams();
  const dispatch = useAppDispatch();
  const {
    deviceList: devices,
    productsPerPage,
    sort,
    fetchDevicesLoading,
    fetchDevicesError,
  } = useAppSelector(state => state.device);

  const handleRetry = () => {
    if (category) {
      dispatch(fetchDevicesList(category));
    }
  };

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    updateSearchParamsWithDefaults({}, searchParams, setSearchParams);
  });

  useEffect(() => {
    updateSearchParamsWithDefaults(
      { page: '1' },
      searchParams,
      setSearchParams,
    );

    const sortFromQuery = searchParams.get('sort') as SortTypes;
    const perPageFromQuery = searchParams.get('perPage') as PerPage;

    if (!sortFromQuery) {
      dispatch(setSortType(DEFAULT_SORT));
    }

    if (!perPageFromQuery) {
      dispatch(setProductsPerPage(DEFAULT_PER_PAGE));
    }
  }, [category]);

  const pageFromQuery = searchParams.get('page') || 1;

  const finalSort = (searchParams.get('sort') as SortTypes) || sort;

  const sortedProducts = useSortedProducts(finalSort, devices);

  const finalProductsPerPage = parsePerPage(
    searchParams.get('perPage'),
    devices.length,
  );

  const {
    visibleProducts,
    nextPage,
    prevPage,
    numbers,
    changeCurrentPage,
    currentPage,
  } = usePagination(sortedProducts, finalProductsPerPage, +pageFromQuery);

  useEffect(() => {
    const sortFromQuery = searchParams.get('sort') as SortTypes;
    const perPageFromQuery = searchParams.get('perPage') as PerPage;

    if (sortFromQuery && sortFromQuery !== sort) {
      dispatch(setSortType(sortFromQuery));
    }

    if (perPageFromQuery && perPageFromQuery !== productsPerPage) {
      dispatch(setProductsPerPage(perPageFromQuery));
    }

    if (pageFromQuery) {
      changeCurrentPage(+pageFromQuery);
    }
  }, [searchParams, dispatch, sort, productsPerPage]);

  useFetchDevices(category);

  const handleSortType = (selectSort: SortTypes) => {
    dispatch(setSortType(selectSort));
    updateSearchParamsWithDefaults(
      { sort: selectSort, page: '1' },
      searchParams,
      setSearchParams,
    );
  };

  const handleProductsPerPage = (option: PerPage) => {
    dispatch(setProductsPerPage(option));
    updateSearchParamsWithDefaults(
      { perPage: option.toString(), page: '1' },
      searchParams,
      setSearchParams,
    );
  };

  const selectedPerPageValue =
    productsPerPage === devices.length ? 'All' : productsPerPage;

  const shouldShowPagination =
    visibleProducts.length > 0 &&
    +productsPerPage !== devices.length &&
    visibleProducts.length <= +productsPerPage;

  return (
    <>
      {fetchDevicesError ? (
        <EmptyState
          image={productNotFound}
          title="Something went wrong while loading products"
          description="Please try again later."
          buttonLink={handleRetry}
          buttonText="Retry"
        />
      ) : devices.length === 0 && !fetchDevicesLoading ? (
        <EmptyState
          image={productNotFound}
          title={`There are no ${title} yet`}
          description="No items dwell here... yet. Stay tuned, wanderer."
        />
      ) : (
        <>
          <div className={styles.optionsContainer}>
            <Sort<SortTypes>
              options={SORT_OPTIONS}
              onChange={handleSortType}
              title={'Sort by'}
              selectedValue={finalSort}
            />

            <Sort<PerPage>
              options={ITEMS_PER_PAGE}
              onChange={handleProductsPerPage}
              title={'Items on page'}
              selectedValue={selectedPerPageValue}
            />
          </div>

          <div className={styles.list}>
            {visibleProducts.map(product => (
              <Card
                key={product.id}
                name={product.name}
                image={product.images[0]}
                capacity={product.capacity}
                price={product.priceDiscount}
                fullPrice={product.priceRegular}
                screen={product.screen}
                ram={product.ram}
                itemId={product.itemId}
                hasDiscount={true}
                category={product.category}
                id={product.id}
              />
            ))}
          </div>

          {shouldShowPagination && (
            <Pagination
              nextPage={nextPage}
              prevPage={prevPage}
              numbers={numbers}
              changeCurrentPage={changeCurrentPage}
              currentPage={currentPage}
            />
          )}
        </>
      )}
    </>
  );
};
