import React, { useContext, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './Products.module.scss';
import { FiltersDropdown } from '../FiltersDropdown';
import { PATH_OPTIONS, TIMEOUT_LOADING_DURATION } from '../../utils/constants';
// eslint-disable-next-line max-len
import { setLoadingWithTimeout } from '../../utils/functions/setLoadingWithTimeout';
import { Product } from '../../types/Product';
import {
  ItemsPerPageOptions,
  ProductsContext,
  SearchOptions,
  SortOptions,
} from '../../contexts/ProductsContext';
import { Pagination } from '../Pagination';
import { ProductsList } from '../../components/ProductsList';
import { Breadcrumbs } from '../Breadcrumbs';

type ProductsProps = {
  products: Product[];
};

export const Products: React.FC<ProductsProps> = ({ products }) => {
  const { state, dispatch } = useContext(ProductsContext);
  const { currentPage, itemsPerPage, sortOption, isLoading } = state;
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  useEffect(() => {
    setLoadingWithTimeout(dispatch, TIMEOUT_LOADING_DURATION);

    const urlSort = searchParams.get(SearchOptions.Sort) || SortOptions.Newest;
    const urlItems =
      searchParams.get(SearchOptions.Items) ||
      ItemsPerPageOptions.Sixteen.toString();
    const urlPage = searchParams.get(SearchOptions.Page) || '1';

    dispatch({ type: 'SET_SORT_OPTION', payload: urlSort as SortOptions });
    dispatch({
      type: 'SET_ITEMS_PER_PAGE',
      payload: +urlItems as ItemsPerPageOptions,
    });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: +urlPage });

    setSearchParams(
      {
        [SearchOptions.Sort]: urlSort,
        [SearchOptions.Items]: urlItems,
        [SearchOptions.Page]: urlPage,
      },
      { replace: true },
    );
  }, [dispatch, searchParams, setSearchParams]);

  const sortedProducts = React.useMemo(() => {
    return [...products].sort((a, b) => {
      switch (sortOption) {
        case SortOptions.Newest:
          return b.year - a.year || a.id - b.id;
        case SortOptions.NameAsc:
          return a.name.localeCompare(b.name);
        case SortOptions.NameDesc:
          return b.name.localeCompare(a.name);
        case SortOptions.PriceAsc:
          return a.price - b.price || a.id - b.id;
        case SortOptions.PriceDesc:
          return b.price - a.price || a.id - b.id;
        default:
          return 0;
      }
    });
  }, [products, sortOption]);

  const displayedProducts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const totalItems = products.length;

  const title = React.useMemo(() => {
    const foundPath = PATH_OPTIONS.find(option => option.label === pathname);

    return foundPath?.value || 'Products';
  }, [pathname]);

  return (
    <div className={styles.products}>
      <div className={styles.products__path}>
        <Breadcrumbs />
      </div>

      <h1 className={styles.products__title}>{title}</h1>

      <p
        className={styles['products__total-items']}
      >{`${totalItems} models`}</p>

      <FiltersDropdown />

      <div className={styles.products__list}>
        <ProductsList products={displayedProducts} isLoading={isLoading} />
      </div>

      {!isLoading && <Pagination totalItems={totalItems} />}
    </div>
  );
};
