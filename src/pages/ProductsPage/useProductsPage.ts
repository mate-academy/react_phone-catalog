import { useCallback, useContext, useEffect, useMemo } from "react";
import { useAppParams } from "../../enhancers/hooks/appParams";
import { useRequest } from "../../enhancers/hooks/request";
import { useProductsSort } from "../../enhancers/hooks/sort";
import { PerPageOption, usePagination } from "../../enhancers/hooks/pagination";
import { DropdownOption } from "../../components/UI/Dropdown/Dropdown";
import { capitalize } from "../../utils/stringHelper";
import { getProductsAmount } from "../../api/products/amount";
import { getProducts } from "../../api/products/main";
import { useSearchParams } from "../../enhancers/hooks/searchParams";
import { SearchParam } from "../../definitions/enums/Router";
import { SearchContext } from "../../store/contexts/SearchContext";

export function useProductsPage() {
  const { category } = useAppParams();

  const getAmount = () => getProductsAmount(category);
  const [productsAmount, amountLoading, amountError] = useRequest(getAmount, [category]);
  const amountHandled = amountLoading ? 0 : (productsAmount ?? 0);

  const [sortBy, sortByOptions, setSortBy, sortQuery] = useProductsSort();
  const changeSortBy = useCallback((option: DropdownOption) => setSortBy(`${option}`), []);

  const perPageOptions: PerPageOption[] = useMemo(() => [4, 8, 16, 'All'], []);
  const params = { perPageOptions, itemsAmount: amountHandled, defaultIndex: 2 };
  const [page, setPage, perPage, setPerPage] = usePagination(params);
  const changePerPage = useCallback((option: DropdownOption) => (
    option === 'All' ? setPerPage('All') : setPerPage(+option)
  ), []);

  const searchParams = useSearchParams();
  const search = searchParams.get(SearchParam.Search);

  useEffect(() => { setPage(1) }, [search]);

  const loadProducts = () => getProducts({
    category, page, perPage, sortQuery, search,
  });
  const [products, loading, error] = useRequest(
    loadProducts, [category, page, perPage, sortQuery, search]
  );

  const { setSearchVisible } = useContext(SearchContext);

  useEffect(() => {
    setSearchVisible(true);

    return () => setSearchVisible(false);
  }, []);

  const amount = search ? (products?.amount ?? 0) : amountHandled;
  const amountLoadingHandled = search ? amountLoading : loading;

  return {
    amountLoading: amountLoadingHandled,
    someProducts: amountHandled > 0,
    amount,
    category: capitalize(category),
    someError: error || amountError,
    products: products?.products ?? null,
    productsLoading: loading,
    perPageIsAll: perPage === 'All',
    sortBy,
    sortByOptions,
    changeSortBy,
    perPageOptions,
    perPage,
    changePerPage,
    page,
    setPage,
  };
}