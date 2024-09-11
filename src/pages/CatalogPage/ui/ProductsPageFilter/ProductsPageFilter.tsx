/* eslint-disable @typescript-eslint/indent */
import { ChangeEvent, memo, useCallback, useEffect, useMemo } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/lib/hooks/reduxHooks';
import {
  ProductsSortField,
  ProductsSortPerPage,
} from '../../../../shared/const';
import { productPageSliceActions } from '../../model/slice/productPageSlice';
import { getProductsSortField } from '../../model/selectors/getProductsSortField';
import cls from './productsPageFilter.module.scss';
import { capitalizeFirstLetter } from '../../../../shared/lib/utils/capitalizeFirstLetter';
import { getCountPerPage } from '../../model/selectors/getProductsPerPage';
import { useParams, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../../shared/lib/utils/getSearchWith';
import { getSearch } from '../../model/selectors/getSearch';
import { initProductsPage } from '../../model/services/initProductsPage';
import { useDebounce } from '../../../../shared/lib/hooks/useDebounce';
import { prepareProductsList } from '../../model/services/prepareProductsList';
import { CategoriesEnum } from '../../../../entities/Categories';
import { getCurrentPage } from '../../model/selectors/getCurrentPage';
import {
  ICustopmSelectOption,
  Input,
  Select,
} from '../../../../shared/ui/forms';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const ProductsPageFilter = memo((props: Props) => {
  const { category } = useParams<{ category: string }>();
  const { className } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { setSort, setPerPage, setSearch, setCurrentPage } =
    productPageSliceActions;
  const sort = useAppSelector(getProductsSortField);
  const perPage = useAppSelector(getCountPerPage);
  const search = useAppSelector(getSearch);
  const page = useAppSelector(getCurrentPage);

  const fetchingData = useCallback(() => {
    dispatch(prepareProductsList(category as CategoriesEnum));
  }, [category, dispatch]);

  const debouncedFetchData = useDebounce(fetchingData, 500);

  const sortByOptions = useMemo<ICustopmSelectOption<ProductsSortField>[]>(
    () =>
      Object.values(ProductsSortField).map(key => ({
        value: key,
        label: capitalizeFirstLetter(key),
      })),
    [],
  );

  const sortByCountItems = useMemo<ICustopmSelectOption<ProductsSortPerPage>[]>(
    () =>
      Object.values(ProductsSortPerPage).map(key => ({
        value: key,
        label: capitalizeFirstLetter(key),
      })),
    [],
  );

  const onChangeSortField = useCallback(
    (newSort: ProductsSortField) => {
      dispatch(setSort(newSort));
      dispatch(setCurrentPage(1));
      setSearchParams(
        getSearchWith(searchParams, {
          sort: newSort !== ProductsSortField.NEWEST ? newSort : null,
        }),
      );
      fetchingData();
    },
    [
      dispatch,
      fetchingData,
      searchParams,
      setCurrentPage,
      setSearchParams,
      setSort,
    ],
  );

  const onChangePerPageCount = useCallback(
    (newPerPage: ProductsSortPerPage) => {
      dispatch(setPerPage(newPerPage));
      dispatch(setCurrentPage(1));
      setSearchParams(
        getSearchWith(searchParams, {
          perPage: newPerPage !== ProductsSortPerPage.ALL ? newPerPage : null,
        }),
      );
      fetchingData();
    },
    [
      dispatch,
      setPerPage,
      setCurrentPage,
      setSearchParams,
      searchParams,
      fetchingData,
    ],
  );

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
    dispatch(setCurrentPage(1));
    setSearchParams(
      getSearchWith(searchParams, {
        search: search !== '' ? search : null,
      }),
    );
    debouncedFetchData();
  };

  useEffect(() => {
    setSearchParams(
      getSearchWith(searchParams, {
        sort: sort !== ProductsSortField.NEWEST ? sort : null,
        perPage: perPage !== ProductsSortPerPage.ALL ? perPage : null,
        search: search !== '' ? search : null,
      }),
    );
  }, [perPage, search, searchParams, setSearchParams, sort]);

  useEffect(() => {
    dispatch(initProductsPage({ searchParams }));
    setSearchParams(
      getSearchWith(searchParams, {
        sort: sort !== ProductsSortField.NEWEST ? sort : null,
        perPage: perPage !== ProductsSortPerPage.ALL ? perPage : null,
        search: search !== '' ? search : null,
        page:
          page !== 1
            ? perPage !== ProductsSortPerPage.ALL
              ? page.toString()
              : null
            : null,
      }),
    );
    fetchingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className={classNames(cls.filters, className)}>
      <Select
        className={`${cls.sort}`}
        label={'Sort By'}
        formElementId="sortBy"
        options={sortByOptions}
        value={sort}
        onChange={onChangeSortField}
      />
      <Select
        className={`${cls.pages}`}
        label={'Items on page'}
        formElementId="itemsOnPage"
        options={sortByCountItems}
        value={perPage}
        onChange={onChangePerPageCount}
      />
      <Input
        className={`${cls.search}`}
        label="Search"
        search={search}
        onChange={onChangeSearch}
      />
    </div>
  );
});
