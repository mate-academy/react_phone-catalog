import React, { useContext, useMemo } from 'react';
import './Catalog.scss';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { ProductsList } from '../ProductsList';
import { Pagination } from '../Pagination';
import { paginationList, sortByList } from '../../utils/data';
import { Dropdown } from '../Dropdown';
import { Breadcrumbs } from '../Breadcrumbs';
import { Product } from '../../type/Product';
import {
  getFirstItemGroup,
  getLastItemGroup,
  getProductsFilter,
} from '../../api';
import { SortParamKeys, PaginationKeys } from '../../type/Sort';
import { NoResults } from '../NoResults';
import { CartContext } from '../CartContext/CartContext';
import { NoSearchResults } from '../NoSearchResults';

type Props = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  isNavigation?: boolean
  pageTitle: string;
};

export const Catalog: React.FC<Props> = ({
  products,
  isLoading,
  isError,
  pageTitle,
  isNavigation = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { appliedQuery } = useContext(CartContext);

  const countItems = (searchParams.get('perPage') as PaginationKeys) || '16';
  const sortBy = (searchParams.get('sort') as SortParamKeys) || 'age';
  const currentPage = searchParams.get('page') || '1';

  const filtredProducts = useMemo(
    () => getProductsFilter(products, sortBy, appliedQuery),
    [products, sortBy, appliedQuery],
  );

  const visibleListProducts = useMemo(() => {
    if (countItems === 'all') {
      return filtredProducts;
    }

    return filtredProducts.slice(
      getFirstItemGroup(+currentPage, +countItems, filtredProducts.length),
      getLastItemGroup(+currentPage, +countItems, filtredProducts.length),
    );
  },
  [currentPage, countItems, filtredProducts]);

  return (
    <div className="container">
      <div className="products">
        {
          !appliedQuery && (
            <section className="page__section">
              <Breadcrumbs />
            </section>
          )
        }
        {
          !appliedQuery ? (
            <section className="page__section">
              <h1 className="products__title page__title">
                {pageTitle}
              </h1>
              <p className="products__count">
                {' '}
                {filtredProducts.length}
                {' '}
                models
              </p>
            </section>
          ) : (
            <section className="page__section">
              <p className="products__count">
                {' '}
                {filtredProducts.length}
                {' '}
                results
              </p>
            </section>
          )
        }

        {
          isNavigation && !appliedQuery && (
            <section className="page__section">
              <nav className="products__nav">
                <Dropdown
                  list={sortByList}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  slug="sort"
                  label="Sort by"
                  title={sortByList[sortBy]}
                />

                <Dropdown
                  list={paginationList}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  slug="perPage"
                  label="Items on page"
                  size="smal"
                  title={paginationList[countItems]}
                />
              </nav>
            </section>
          )
        }

        {
          isError && (
            <p className="has-text-danger">
              Something went wrong
            </p>
          )
        }

        {
          isLoading && (
            <Loader />
          )
        }

        {
          !isLoading && filtredProducts.length > 0 && (
            <section className="page__section">
              <ProductsList products={visibleListProducts} />
            </section>
          )
        }

        {
          products.length === 0 && (
            <NoResults categoryName={pageTitle} />
          )
        }

        {
          (filtredProducts.length === 0 && products.length !== 0) && (
            <NoSearchResults searchText={appliedQuery} />
          )
        }

        {
          (countItems !== 'all' && filtredProducts.length >= +countItems) && (
            <section className="page__section">
              <Pagination
                total={filtredProducts.length}
                perPage={+countItems}
                currentPage={+currentPage}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </section>
          )
        }
      </div>
    </div>
  );
};
