import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { NavigationItem } from '../../shared/layout/NavigationItem';
import styles from './ProductsPage.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useProducts } from '../../shared/context/ProductsContext';
import { SortItem } from './components/SortItem';
import { ProductsList } from '../../shared/layout/ProductsList/ProductsList';
import { PaginationItem } from './components/PaginationItem';
import { Loader } from '../../shared/layout/Loader';
import { debounce } from 'lodash';
import LinearProgress from '@mui/material/LinearProgress';

type Props = {
  title: string;
};

const sortBy = ['Newest', 'Alphabetically', 'Cheapest'];
const itemsOnPage = ['4', '8', '16', 'all'];

export const ProductsPage: React.FC<Props> = ({ title }) => {
  const [searchParams] = useSearchParams();

  const reverseTransformValue = (value: string) => {
    if (value === 'age') {
      return 'Newest';
    }

    if (value === 'title') {
      return 'Alphabetically';
    }

    if (value === 'price') {
      return 'Cheapest';
    }

    return value;
  };

  const selected = reverseTransformValue(searchParams.get('sort') || 'Newest');
  const search = searchParams.get('search') || '';
  const perPage = searchParams.get('perPage') || 'all';
  const page = searchParams.get('page') || '1';

  const [debouncedSelected, setDebouncedSelected] = useState(selected);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [filtering, setFiltering] = useState(false);

  const isFirstSortRender = useRef(true);
  const isFirstSearchRender = useRef(true);

  const { pathname } = useLocation();
  const category = pathname.split('/')[1];
  const { products, hasError, loading } = useProducts();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChange = useCallback(
    debounce((value: string) => {
      setDebouncedSelected(value);
      setFiltering(false);
    }, 300),
    [],
  );

  useEffect(() => {
    if (isFirstSortRender.current) {
      isFirstSortRender.current = false;

      return;
    }

    debouncedChange(selected);
    setFiltering(true);
  }, [selected, debouncedChange]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
      setFiltering(false);
    }, 500),
    [],
  );

  useEffect(() => {
    if (isFirstSearchRender.current) {
      isFirstSearchRender.current = false;

      return;
    }

    debouncedChangeSearch(search);
    setFiltering(true);
  }, [search, debouncedChangeSearch]);

  const filteredProducts = useMemo(() => {
    const filteredByCategory = products.filter(
      product => product.category === category,
    );

    const filteredBySearch = filteredByCategory.filter(product =>
      product.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );

    switch (debouncedSelected) {
      case 'Newest': {
        return filteredBySearch.sort((a, b) => b.year - a.year);
      }

      case 'Alphabetically': {
        return filteredBySearch.sort((a, b) => a.name.localeCompare(b.name));
      }

      case 'Cheapest': {
        return filteredBySearch.sort((a, b) => a.price - b.price);
      }

      default:
        return filteredBySearch;
    }
  }, [products, category, debouncedSelected, debouncedSearch]);

  const transformValue = (value: string) => {
    if (value === 'Newest') {
      return 'age';
    }

    if (value === 'Alphabetically') {
      return 'title';
    }

    if (value === 'Cheapest') {
      return 'price';
    }

    return undefined;
  };

  const perPageNum =
    perPage === 'all' ? filteredProducts.length : Number(perPage);
  const totalPages =
    perPage === 'all'
      ? 1
      : Math.max(1, Math.ceil(filteredProducts.length / perPageNum));

  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const [slicedPages, setSlicedPages] = useState<number[]>([]);

  useEffect(() => {
    const currentPage = +page - 1;

    setSlicedPages(pages.slice(currentPage, currentPage + 4));
  }, [pages, page]);

  const start = (+page - 1) * perPageNum;
  const end = start + perPageNum;
  const paginatedProducts =
    perPage === 'all' ? filteredProducts : filteredProducts.slice(start, end);

  const noProductsMessage =
    !loading && !hasError && filteredProducts?.length === 0;

  return (
    <div className={styles['products-page']}>
      {!loading && !hasError && filtering && (
        <div
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2000,
          }}
        >
          <LinearProgress />
        </div>
      )}

      <div className={`${styles['products-page__container']} container`}>
        {loading && <Loader />}

        {hasError && (
          <div className={styles.message__error}>Something went wrong</div>
        )}

        {filteredProducts && filteredProducts.length > 0 && (
          <>
            <NavigationItem />
            <div className={styles['products-page__title']}>{title}</div>
            <div className={styles['products-page__subtitle']}>
              {filteredProducts?.length} models
            </div>

            <div className={styles['products-page__sortitems']}>
              <SortItem
                params={sortBy}
                selected={selected}
                sortBy="sort"
                transformValue={transformValue}
                setSlicedPages={setSlicedPages}
                searchParams={searchParams}
                pathname={pathname}
              />

              <SortItem
                params={itemsOnPage}
                selected={perPage}
                sortBy="perPage"
                setSlicedPages={setSlicedPages}
                searchParams={searchParams}
                pathname={pathname}
              />
            </div>

            <ProductsList filteredProducts={paginatedProducts} />

            {perPage !== 'all' && (
              <PaginationItem
                pages={pages}
                numberOfPage={page}
                slicedPages={slicedPages}
                setSlicedPages={setSlicedPages}
              />
            )}
          </>
        )}

        {!loading && !hasError && products && products.length === 0 && (
          <div className={styles.message__error}>
            There are no {category} yet
          </div>
        )}

        {noProductsMessage && (
          <div className={styles.message__error}>
            There are no {category} matching the query
          </div>
        )}
      </div>
    </div>
  );
};
