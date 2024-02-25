/* eslint-disable jsx-a11y/control-has-associated-label */
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CategoryName, IProduct } from '../../types';
import { SORT_VALUES, SearchParamsNames } from '../../constants';

import {
  getCategoryTitle,
  fetchCategoryProducts,
} from '../../utils';

import { SectionHeader } from '../SectionHeader';
import { PagePagination } from '../PagePagination';
import { PageFilter } from '../PageFilter';
import { Breadcrumbs } from '../PageSmallNav';
import { ProductCard } from '../ProductCard';
import { NoResults } from '../NoResults';
import { Loader } from '../Loader';
import { NoSearchResults } from '../NoSearchResults';

import './ProductsPage.scss';

type Props = {
  classNames?: string,
  title?: string
};

const getVisibleProducts = (
  products: IProduct[],
  sortValue: string,
  filterValue: string,
  page: number,
): IProduct[] => {
  const visibleProducts = [...products];

  switch (sortValue) {
    case SORT_VALUES.Alphabetically:
      visibleProducts.sort((pr1, pr2) => (
        pr1.name.localeCompare(pr2.name)
      ));
      break;

    case SORT_VALUES.Cheapest:
      visibleProducts.sort((pr1, pr2) => (
        pr1.price - pr2.price
      ));
      break;

    default:
      visibleProducts.sort((pr1, pr2) => (
        pr1.age - pr2.age
      ));
      break;
  }

  switch (filterValue) {
    case 'all': {
      return visibleProducts;
    }

    default: {
      const index = ((page - 1) * (+filterValue));

      return visibleProducts.slice(
        index, +filterValue + index,
      );
    }
  }
};

export const ProductsPage: React.FC<Props> = ({
  title,
}) => {
  const location = useLocation();
  const categoryName = location.pathname.slice(1);
  const dispatch = useAppDispatch();
  const {
    hasError,
    loaded,
    products: fetchedProducts,
  } = useAppSelector(state => {
    switch (categoryName) {
      case CategoryName.Tablets:
        return state.tablets;

      case CategoryName.Phones:
        return state.phones;

      case CategoryName.Accessories:
      default:
        return state.accessories;
    }
  });

  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get(SearchParamsNames.sort) || SORT_VALUES.Newest;
  const filterBy = searchParams.get(SearchParamsNames.filter) || '4';
  const searchQuery = searchParams.get(SearchParamsNames.query) || '';
  const currentPage = +(searchParams.get(SearchParamsNames.page) || 1);

  const categoryTitle = useMemo(() => (
    title || getCategoryTitle(categoryName)
  ), [categoryName, title]);

  const products = useMemo(() => (
    searchQuery
      ? fetchedProducts
        .filter(product => (
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      : fetchedProducts
  ), [fetchedProducts, searchQuery]);

  const visibleProducts = useMemo(() => (
    getVisibleProducts(
      products,
      sortBy,
      filterBy,
      currentPage,
    )
  ), [currentPage, filterBy, sortBy, products]);

  const fetchedProductsCount = fetchedProducts.length;
  const productsCount = products.length;

  useEffect(() => {
    dispatch(fetchCategoryProducts(categoryName));
  }, [dispatch, categoryName]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  return (
    <div className="products-page">
      <Breadcrumbs />

      {(!loaded && !hasError) && <Loader />}

      {
        (loaded && fetchedProductsCount && !hasError)
          ? (
            <>
              <div className="products-page__title">
                <SectionHeader
                  title={categoryTitle}
                  subtitle={`${productsCount} models`}
                />
              </div>

              {
                productsCount
                  ? (
                    <>
                      <PageFilter
                        sortValue={sortBy}
                        filterValue={filterBy}
                      />

                      <div
                        className="products-page__cards"
                        data-cy="productList"
                      >
                        { visibleProducts.map(product => (
                          <ProductCard
                            product={product}
                            key={product.id}
                          />
                        ))}
                      </div>

                      {((productsCount > +filterBy) && filterBy !== 'all') && (
                        <PagePagination
                          productsCount={productsCount}
                          currentPage={currentPage}
                          filterValue={filterBy}
                        />
                      )}
                    </>
                  )
                  : <NoSearchResults />
              }
            </>
          )
          : (
            <NoResults title={categoryTitle} />
          )
      }

    </div>
  );
};
