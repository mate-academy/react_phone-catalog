import './ProductsPage.scss';
import React, { useContext, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Dropdown } from '../Dropdown';
import { Pagination } from '../Pagination';
import { ProductList } from '../ProductList';
import { SortByValues } from '../../types/SortByValues';
import { sortByOptions } from '../../services/sortByOptions';
import { PerPageValues } from '../../types/PerPageValues';
import { perPageOptions } from '../../services/PerPageOptions';
import { DEFAULT_PER_PAGE } from '../../helpers/constants';
import { Loader } from '../Loader';
import { Notification } from '../Notification';
import { BreadCrumbs } from '../BreadCrumbs';
import { getSearchWith } from '../../utils/getSearchWith';
import { QuerySearchContext } from '../QuerySearchContext';

interface Props {
  products: Product[];
  title: string;
  isLoading: boolean;
  errorMessage: string;
}

export const ProductsPage: React.FC<Props> = ({
  products,
  title,
  isLoading,
  errorMessage,
}) => {
  const totalProducts = products.length;
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const { appliedQuery } = useContext(QuerySearchContext);
  const perPage = searchParams.get('perPage') || DEFAULT_PER_PAGE;
  const currentPage = +(searchParams.get('page') || 1);
  const isPerPageAll = useMemo(() => {
    return perPage === PerPageValues.ALL;
  }, [perPage]);
  const from = +perPage * currentPage - (+perPage);
  const to = +perPage * currentPage;

  const preparedProducts = useMemo(() => {
    const sortedProducts = [...products]
      .sort((p1, p2) => {
        switch (sortBy) {
          case SortByValues.NAME:
            return p1.name.localeCompare(p2.name);

          case SortByValues.AGE:
            return p2.year - p1.year;

          case SortByValues.PRICE:
            return p1.price - p2.price;

          default:
            return 0;
        }
      });

    return sortedProducts.filter(item => {
      return item.name.toLowerCase().includes(appliedQuery.toLowerCase());
    });
  }, [products, appliedQuery, sortBy]);

  const visibleProducts = useMemo(() => {
    return +(perPage || 0)
      ? preparedProducts.slice(from, to)
      : preparedProducts;
  }, [from, perPage, to, preparedProducts]);

  const isPaginaitonShown = useMemo(() => {
    return preparedProducts.length > 4;
  }, [preparedProducts]);

  useEffect(() => {
    if (!isPaginaitonShown && products.length) {
      setSearchParams(
        getSearchWith({ page: null, perPage: null }, searchParams),
      );
    }
  }, [isPaginaitonShown, searchParams, setSearchParams, products]);

  useEffect(() => {
    if (isPerPageAll) {
      setSearchParams(
        getSearchWith({ page: null }, searchParams),
      );
    }
  }, [isPerPageAll, setSearchParams, searchParams]);

  return (
    <div className="products-page">
      <div className="products-page__content">
        <div className="products-page__wrapper">
          <BreadCrumbs />

          <h1 className="title products-page__title">
            {title}
          </h1>

          <p className="products-page__quantity">
            {`${totalProducts} models`}
          </p>
        </div>

        <div className="products-page__products">
          <div className="products-page__dropdowns">
            {!errorMessage && !isLoading && (
              <Dropdown
                options={sortByOptions}
                searchName="sort"
                title="Sort By"
                defaultValue="Choose option"
              />
            )}

            {isPaginaitonShown && !errorMessage && !isLoading && (
              <Dropdown
                options={perPageOptions}
                searchName="perPage"
                title="Items per page"
                defaultValue={DEFAULT_PER_PAGE}
              />
            )}
          </div>

          {errorMessage && (
            <Notification message={errorMessage} />
          )}

          {appliedQuery && !preparedProducts.length && !errorMessage && (
            <Notification message="No result was found" />
          )}

          {isLoading && <Loader />}
          {!isLoading && !errorMessage && (
            <ProductList products={visibleProducts} />
          )}

          {isPaginaitonShown && !isPerPageAll && !isLoading && (
            <Pagination
              totalItems={preparedProducts.length}
              perPage={+perPage}
              searchName="page"
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};
