import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';
import { Dropdown } from '../shared/Dropdown';
import { Pagination } from '../shared/Pagination';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { ProductsList } from '../shared/ProductsList';
import { Loader } from '../shared/Loader';
import { GlobalContext } from '../../context/GlobalContext';
import { getSearchWith } from '../../utils/searchHelper';
import { prepareProductList } from './utils/prepareProductList';
import { capitalizeFirstCharacter } from '../../utils';
import { ProductPageProps } from './types/types';
import './ProductPage.scss';

const DEFAULT_SORT = 'Newest';
const DEFAULT_ITEMS_PER_PAGE = 'All';
const DEFAULT_PAGE = 1;
const SORT_OPTIONS = ['Newest', 'Alphabetically', 'Cheapest'] as const;
const ITEMS_PER_PAGE_OPTIONS = ['4', '8', '16', 'All'] as const;
const LOADING_DELAY = 500;

export const ProductPage: FC<ProductPageProps> = ({ category }) => {
  const { allProducts } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const sortBy = searchParams.get('sort') || DEFAULT_SORT;
  const itemsPerPage = searchParams.get('perPage') || DEFAULT_ITEMS_PER_PAGE;
  const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE;
  const searchQuery = searchParams.get('query') || '';

  const productType = useMemo(
    () => location.pathname.split('/')[1],
    [location.pathname],
  );

  const categoryProducts = useMemo(
    () => allProducts.filter(product => product.category === category),
    [allProducts, category],
  );

  const filteredProducts = useMemo(
    () =>
      prepareProductList(categoryProducts, {
        sortBy,
        query: searchQuery,
      }),
    [categoryProducts, searchQuery, sortBy],
  );

  const totalProducts = filteredProducts.length;

  const paginationConfig = useMemo(() => {
    const isShowingAll = itemsPerPage === DEFAULT_ITEMS_PER_PAGE;
    const itemsPerPageNum = Number(itemsPerPage);
    const totalPages = isShowingAll
      ? 1
      : Math.ceil(totalProducts / itemsPerPageNum);
    const startIndex = (currentPage - 1) * itemsPerPageNum;

    return {
      isShowingAll,
      itemsPerPageNum,
      totalPages,
      startIndex,
    };
  }, [itemsPerPage, totalProducts, currentPage]);

  const currentProducts = useMemo(() => {
    const { isShowingAll, startIndex, itemsPerPageNum } = paginationConfig;

    return isShowingAll
      ? filteredProducts
      : filteredProducts.slice(startIndex, startIndex + itemsPerPageNum);
  }, [filteredProducts, paginationConfig]);

  const handleSortChange = useCallback(
    (value: string) => {
      setIsLoading(true);
      const params = value === DEFAULT_SORT ? { sort: null } : { sort: value };

      setSearchParams(getSearchWith(searchParams, params));
    },
    [searchParams, setSearchParams],
  );

  const handleItemsPerPageChange = useCallback(
    (value: string) => {
      setIsLoading(true);
      const params =
        value === DEFAULT_ITEMS_PER_PAGE
          ? { perPage: null, page: null }
          : { perPage: value, page: '1' };

      setSearchParams(getSearchWith(searchParams, params));
    },
    [searchParams, setSearchParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setIsLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const params =
        page === DEFAULT_PAGE ? { page: null } : { page: String(page) };

      setSearchParams(getSearchWith(searchParams, params));
    },
    [searchParams, setSearchParams],
  );

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        if (!allProducts?.length) {
          setError('Failed to load products');
        }
      } catch {
        setError('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    }, LOADING_DELAY);

    return () => clearTimeout(timer);
  }, [category, allProducts, sortBy, itemsPerPage, currentPage, searchQuery]);

  const renderError = () => (
    <div className="productPage__error">
      <p>Something went wrong. Please try again.</p>
      <button onClick={handleReload}>Reload</button>
    </div>
  );

  const renderNoProducts = () => {
    if (searchQuery) {
      return (
        <p className="productPage__no-products">
          {`There are no ${productType} matching the query`}
        </p>
      );
    }

    return (
      <div className="productPage__no-products">
        <p>There are no {category} yet.</p>
      </div>
    );
  };

  const renderProductsContent = () => (
    <>
      <Breadcrumbs productType={category} />

      <h1 className="productPage__title">
        {capitalizeFirstCharacter(category)} page
      </h1>

      <span className="productPage__description">
        {`${totalProducts} model${totalProducts !== 1 ? 's' : ''}`}
      </span>

      <div className="productPage__dropdown">
        <div className="productPage__dropdown--sortBy">
          <Dropdown
            label="Sort by"
            selected={sortBy}
            options={SORT_OPTIONS.slice()}
            onChange={handleSortChange}
          />
        </div>
        <div className="productPage__dropdown--itemsPerPage">
          <Dropdown
            label="Items on page"
            selected={itemsPerPage}
            options={ITEMS_PER_PAGE_OPTIONS.slice()}
            onChange={handleItemsPerPageChange}
          />
        </div>
      </div>

      <ProductsList products={currentProducts} displayType="with-discount" />

      {!paginationConfig.isShowingAll && paginationConfig.totalPages > 1 && (
        <Pagination
          total={totalProducts}
          perPage={paginationConfig.itemsPerPageNum}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );

  return (
    <div className="productPage">
      {isLoading && <Loader />}

      {!isLoading && error && renderError()}

      {!isLoading && !error && !filteredProducts.length && renderNoProducts()}

      {!isLoading &&
        !error &&
        filteredProducts.length > 0 &&
        renderProductsContent()}
    </div>
  );
};
