/* eslint-disable jsx-a11y/control-has-associated-label */
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { Pagination } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProductCategory, IProduct } from '../../types';
import { SORT_VALUES, SearchParamsNames } from '../../constants';

import {
  getCategoryTitle,
  fetchCategoryProducts,
  getSearchWith,
} from '../../utils';

import {
  SectionHeader,
  PageFilter,
  Breadcrumbs,
  ProductCard,
  NoResults,
  Loader,
  NoSearchResults,
  ErrorMessage,
} from '../../components';

import './ProductsPage.scss';

type Props = {
  classNames?: string;
  title?: string;
};

export const getVisibleProducts = (
  products: IProduct[],
  sortValue: string,
  filterValue: string,
  page: number,
): IProduct[] => {
  const visibleProducts = [...products];

  switch (sortValue) {
    case SORT_VALUES.Alphabetically:
      visibleProducts.sort((pr1, pr2) => pr1.name.localeCompare(pr2.name));
      break;

    case SORT_VALUES.Cheapest:
      visibleProducts.sort((pr1, pr2) => pr1.price - pr2.price);
      break;

    default:
      visibleProducts.sort((pr1, pr2) => pr1.year - pr2.year);
      break;
  }

  switch (filterValue) {
    case 'all': {
      return visibleProducts;
    }

    default: {
      const index = (page - 1) * +filterValue;

      return visibleProducts.slice(index, +filterValue + index);
    }
  }
};

export const ProductsPage: React.FC<Props> = ({ title }) => {
  const location = useLocation();
  const categoryName = location.pathname.slice(1);
  const dispatch = useAppDispatch();
  const {
    hasError,
    loaded,
    products: fetchedProducts,
  } = useAppSelector(state => {
    switch (categoryName) {
      case ProductCategory.Tablets:
        return state.tablets;

      case ProductCategory.Phones:
        return state.phones;

      case ProductCategory.Accessories:
      default:
        return state.accessories;
    }
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get(SearchParamsNames.sort) || SORT_VALUES.Newest;
  const filterBy = searchParams.get(SearchParamsNames.filter) || '4';
  const searchQuery = searchParams.get(SearchParamsNames.query) || '';
  const currentPage = +(searchParams.get(SearchParamsNames.page) || 1);

  const categoryTitle = useMemo(
    () => title || getCategoryTitle(categoryName),
    [categoryName, title],
  );

  const filteredProductsBySearchQuery = useMemo(
    () =>
      searchQuery
        ? fetchedProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : fetchedProducts,
    [fetchedProducts, searchQuery],
  );

  const visibleProducts = useMemo(
    () =>
      getVisibleProducts(
        filteredProductsBySearchQuery,
        sortBy,
        filterBy,
        currentPage,
      ),
    [currentPage, filterBy, sortBy, filteredProductsBySearchQuery],
  );

  const fetchedProductsCount = fetchedProducts.length;
  const filteredProductsCount = filteredProductsBySearchQuery.length;
  const hasLoader = !loaded && !hasError;
  const hasFetchedProducts = loaded && !!fetchedProductsCount && !hasError;
  const hasNoFetchedProducts = loaded && !fetchedProductsCount && !hasError;
  const hasErrorMessage = loaded && hasError;
  const pageCount = Math.ceil(filteredProductsCount / +filterBy);

  useEffect(() => {
    dispatch(fetchCategoryProducts(categoryName));
  }, [dispatch, categoryName]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  const handleSetParams = (paramValue: string) => {
    const newParams = getSearchWith(
      { [SearchParamsNames.page]: paramValue || null },
      searchParams,
    );

    setSearchParams(newParams);
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className="products-page">
        <Breadcrumbs classNames="products-page__breadcrumbs" />

        {hasLoader && <Loader />}

        {hasFetchedProducts && (
          <>
            <div className="products-page__title">
              <SectionHeader
                title={categoryTitle}
                subtitle={`${filteredProductsCount} ${searchQuery ? 'results' : 'models'}`}
              />
            </div>

            {filteredProductsCount ? (
              <>
                <PageFilter sortValue={sortBy} filterValue={filterBy} />

                <div className="products-page__cards" data-cy="productList">
                  {visibleProducts.map(product => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </div>

                {filteredProductsCount > +filterBy && filterBy !== 'all' && (
                  <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={(_, page) => handleSetParams(String(page))}
                    variant="outlined"
                    shape="rounded"
                    className="products-page__pagination"
                  />
                )}
              </>
            ) : (
              <NoSearchResults />
            )}
          </>
        )}

        {hasNoFetchedProducts && (
          <NoResults title={`${categoryTitle} not found`} hasBackButton />
        )}

        {hasErrorMessage && (
          <ErrorMessage
            title={`Failed to fetch ${categoryTitle.toLowerCase()} `}
          />
        )}
      </div>
    </StyledEngineProvider>
  );
};
