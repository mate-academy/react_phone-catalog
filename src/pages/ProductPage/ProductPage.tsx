import './ProductPage.scss';
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
import { GlobalContext } from '../../context/GlobalContext';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { ProductsList } from '../shared/ProductsList';
import { Loader } from '../shared/Loader';

import { getSearchWith } from '../../utils/searchHelper';
import { prepareProductList } from './utils';
import { capitalizeFirstCharacter } from '../../utils';

type Props = {
  category: string;
};

export const ProductPage: FC<Props> = ({ category }) => {
  const { allProducts } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'Newest';
  const itemsPerPage = searchParams.get('perPage') || 'All';
  const currentPage = Number(searchParams.get('page')) || 1;
  const queryParam = searchParams.get('query') || '';

  const location = useLocation();

  const typeProduct = useMemo(
    () => location.pathname.split('/')[1],
    [location.pathname],
  );

  const categoryProducts = useMemo(
    () => allProducts.filter(product => product.category === category),
    [allProducts, category],
  );

  const visibleProducts = useMemo(
    () =>
      prepareProductList(categoryProducts, {
        sortBy,
        query: queryParam,
      }),
    [categoryProducts, queryParam, sortBy],
  );

  const countVisibleProducts = useMemo(
    () => visibleProducts.length,
    [visibleProducts.length],
  );

  const handleSortChange = useCallback(
    (value: string) => {
      const updatedParams =
        value === 'Newest' ? { sort: null } : { sort: value };

      setSearchParams(getSearchWith(searchParams, updatedParams));
    },
    [searchParams, setSearchParams],
  );

  const handleItemsPerPageChange = useCallback(
    (value: string) => {
      const updatedParams =
        value === 'All'
          ? { perPage: null, page: null }
          : { perPage: value, page: '1' };

      setSearchParams(getSearchWith(searchParams, updatedParams));
    },
    [searchParams, setSearchParams],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const updatedParams =
        page === 1 ? { page: null } : { page: String(page) };

      setSearchParams(getSearchWith(searchParams, updatedParams));
    },
    [searchParams, setSearchParams],
  );

  const totalPages = useMemo(
    () =>
      itemsPerPage === 'All'
        ? 1
        : Math.ceil(countVisibleProducts / +itemsPerPage),
    [countVisibleProducts, itemsPerPage],
  );

  const startIndex = useMemo(
    () => (currentPage - 1) * +itemsPerPage,
    [currentPage, itemsPerPage],
  );

  const currentItems = useMemo(
    () =>
      itemsPerPage === 'All'
        ? visibleProducts
        : visibleProducts.slice(startIndex, startIndex + +itemsPerPage),
    [itemsPerPage, startIndex, visibleProducts],
  );

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        if (!allProducts || allProducts.length === 0) {
          setError('Failed to load products');
        }
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [category, allProducts]);

  return (
    <div className="productPage">
      {isLoading && <Loader />}

      {!isLoading && error && (
        <div className="productPage__error">
          <p>Something went wrong. Please try again.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      )}

      {!isLoading && !error && !visibleProducts.length && !queryParam ? (
        <div className="productPage__no-products">
          <p>There are no {category} yet.</p>
        </div>
      ) : null}

      {!isLoading && !error && !visibleProducts.length && queryParam ? (
        <p className="productPage__no-products">{`There are no ${typeProduct} matching the query`}</p>
      ) : null}

      {!isLoading && !error && visibleProducts.length ? (
        <>
          <Breadcrumbs productType={category!} />

          <h1 className="productPage__title">
            {category && `${capitalizeFirstCharacter(category)} page`}
          </h1>

          <span className="productPage__description">
            {`${countVisibleProducts} model${countVisibleProducts !== 1 ? 's' : ''}`}
          </span>

          <div className="productPage__dropdown">
            <div className="productPage__dropdown--sortBy">
              <Dropdown
                label="Sort by"
                selected={sortBy}
                options={['Newest', 'Alphabetically', 'Cheapest']}
                onChange={handleSortChange}
              />
            </div>
            <div className="productPage__dropdown--itemsPerPage">
              <Dropdown
                label="Items on page"
                selected={itemsPerPage}
                options={['4', '8', '16', 'All']}
                onChange={handleItemsPerPageChange}
              />
            </div>
          </div>

          <ProductsList products={currentItems} displayType={'with-discount'} />

          {itemsPerPage !== 'All' && totalPages > 1 && (
            <Pagination
              total={countVisibleProducts}
              perPage={+itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : null}
    </div>
  );
};
