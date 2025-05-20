import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import productsPageStyles from './ProductsPage.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../services/products';
import { ProductList } from '../../components/ProductList';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Pagination } from '../../components/Pagination';
import { getSearchWith, SearchParams } from '../../helpers/searchHelper';
import { Option } from '../../types/Option';
import { getNormalizedTitle } from '../../helpers/stringHelper';
import { LoaderOverlay } from '../../components/LoaderOverlay';
import isEqual from 'lodash.isequal';
import { CategoriesContext } from '../../context/CategoriesContext';
import { NotFoundPage } from '../NotFoundPage';
import { useLoading } from '../../context/LoadingContext';
import { useNotification } from '../../context/NotificationContext';
import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';
import { handleErrorMessage } from '../../utils/handleErrorMessage';

const SORT_OPTIONS: Option[] = [
  { label: 'Newest', value: null },
  { label: 'Alphabetically', value: 'name' },
  { label: 'Cheapest', value: 'price' },
];
const PER_PAGE_OPTIONS: Option[] = [
  { label: 'All', value: null },
  { label: '4', value: 4 },
  { label: '8', value: 8 },
  { label: '16', value: 16 },
];

export const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addNotification } = useNotification();
  const [isHasError, setIsHasError] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage')
    ? Number(searchParams.get('perPage'))
    : null;
  const currentPage = +(searchParams.get('page') || 1);
  const { category } = useParams();
  const { categories } = useContext(CategoriesContext);
  const isIncludeCategory = categories.some(
    categoryItem => categoryItem.name === category,
  );

  const loadProducts = useCallback(() => {
    if (!category || !isIncludeCategory) {
      return;
    }

    startLoading();
    setIsHasError(false);
    getProductsByCategory(category)
      .then(newProducts => {
        setProducts(prevProducts =>
          !isEqual(prevProducts, newProducts) ? newProducts : prevProducts,
        );
      })
      .catch(err => {
        addNotification(
          'error',
          handleErrorMessage(err, 'Failed to load products.'),
        );
        setIsHasError(true);
      })
      .finally(stopLoading);
  }, [isIncludeCategory, category, startLoading, stopLoading, addNotification]);

  useEffect(() => loadProducts(), [loadProducts]);

  const setSearchWith = useCallback(
    (params: SearchParams) => {
      setSearchParams(getSearchWith(searchParams, params));
    },
    [searchParams, setSearchParams],
  );

  const firstIndex = useMemo(
    () => (perPage ? (currentPage - 1) * perPage : 0),
    [currentPage, perPage],
  );

  const lastIndex = useMemo(
    () => (perPage ? firstIndex + perPage : products.length),
    [firstIndex, perPage, products],
  );

  const visibleProducts = useMemo(
    () =>
      [...products]
        .sort((product1, product2) => {
          switch (sort?.toLowerCase()) {
            case 'price':
              return product1.price - product2.price;

            case 'name':
              return product1.name.localeCompare(product2.name);

            default:
              return product2.year - product1.year;
          }
        })
        .slice(firstIndex, lastIndex),
    [products, sort, firstIndex, lastIndex],
  );

  if (!category || !isIncludeCategory) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <LoaderOverlay />;
  }

  return (
    <section className={productsPageStyles.productPage}>
      <div className={productsPageStyles.productPage__header}>
        <h2 className={productsPageStyles.productPage__title}>
          {getNormalizedTitle(category)}
        </h2>
        <p className={productsPageStyles.productPage__subtitle}>
          {isHasError ? 'Failed to load products' : `${products.length} models`}
        </p>
      </div>
      {isHasError ? (
        <ErrorFallback onRetry={loadProducts} />
      ) : (
        <>
          <div className={productsPageStyles.productPage__products}>
            <div className={productsPageStyles.productPage__dropdowns}>
              <Dropdown
                options={SORT_OPTIONS}
                label="Sort by"
                defaultValue={sort}
                onSelect={option =>
                  setSearchWith(
                    perPage ? { sort: option, page: 1 } : { sort: option },
                  )
                }
              />
              <Dropdown
                options={PER_PAGE_OPTIONS}
                label="Items on page"
                defaultValue={perPage}
                onSelect={option =>
                  setSearchWith(
                    !option
                      ? { page: null, perPage: option }
                      : { page: 1, perPage: option },
                  )
                }
              />
            </div>
            <ProductList products={visibleProducts} />
          </div>
          {perPage && (
            <Pagination
              totalProducts={products.length}
              perPage={perPage}
              currentPage={currentPage}
              maxVisiblePages={4}
              onPageChange={page => setSearchWith({ page: page.toString() })}
            />
          )}
        </>
      )}
    </section>
  );
};
