import {
  useCallback, useContext, useEffect, useMemo,
} from 'react';
import { useAppParams } from '../../enhancers/hooks/appParams';
import { useRequest } from '../../enhancers/hooks/request';
import { useProductsSort } from '../../enhancers/hooks/sort';
import { usePagination } from '../../enhancers/hooks/pagination';
import { PerPageOption } from '../../api/products/server/types';
import { DropdownOption } from '../../components/UI/Dropdown/Dropdown';
import { capitalize } from '../../utils/stringHelper';
import { getProductsAmount } from '../../api/products/client/amount';
import { getProducts } from '../../api/products/client/products';
import { SearchContext } from '../../store/contexts/SearchContext';

export function useProductsPage() {
  const { category } = useAppParams();

  const [allProductsAmount, allAmountLoading, allAmountError] = useRequest(
    () => getProductsAmount(category), [category], null,
  );
  const amountHandled = allAmountLoading ? 0 : (allProductsAmount ?? 0);

  const [sortBy, sortByOptions, setSortBy, sortQuery] = useProductsSort();
  const changeSortBy = useCallback((option: DropdownOption) => setSortBy(`${option}`), [setSortBy]);

  const perPageOptions: PerPageOption[] = useMemo(() => [4, 8, 16, 'All'], []);
  const params = { perPageOptions, itemsAmount: amountHandled, defaultIndex: 2 };
  const [page, setPage, perPage, setPerPage] = usePagination(params);
  const changePerPage = useCallback((option: DropdownOption) => (
    option === 'All' ? setPerPage('All') : setPerPage(+option)
  ), [setPerPage]);

  const { search } = useContext(SearchContext);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const loadProducts = () => getProducts({
    category, sortQuery, search, pagination: { page, perPage },
  });

  const [products, loading, error] = useRequest(
    loadProducts, [category, page, perPage, sortQuery, search], { products: [], amount: 0 },
  );

  const amount = search ? (products.amount ?? 0) : amountHandled;
  const amountLoadingHandled = search ? allAmountLoading : loading;
  const items = search ? 'results' : 'models';
  const showNoResults = !!(search && products?.products.length === 0);

  const toExport = {
    amountLoading: amountLoadingHandled,
    amount,
    category: capitalize(category),
    someError: error || allAmountError,
    products: products.products,
    productsLoading: loading,
    perPageIsAll: perPage === 'All',
    sortBy,
    sortByOptions,
    changeSortBy,
    perPageOptions,
    perPage,
    changePerPage,
    page,
    pageAmount: Math.ceil(amount / (perPage === 'All' ? 1 : perPage)),
    setPage,
    items,
    noProductsText: showNoResults ? 'There are no results for this search query' : null,
  };

  return toExport;
}
