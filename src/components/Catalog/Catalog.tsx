/* eslint-disable */
import './Catalog.scss';
import React, { useEffect, useState, memo, } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getAccessories, getPhones, getProducts, getTablets,
} from '../../api/products';
import { Product } from '../../types/Product';
import { Loader } from '../Loader';
import { ProductsList } from '../ProductsList';
import { Pagination } from '../Pagination';
import { NoResults } from '../NoResults';
import { NoSearchResult } from '../NoSearchResult';
import { Dropdown } from '../Dropdown';
import {
  sortOptions,
  paginationOptions,
  getFilterProducts,
  filterQuery,
} from './utils';
import { Breadcrumbs } from '../Breadcrumbs';

type Props = {
  title: string
};

export const Catalog: React.FC<Props> = memo(({ title }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = +(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage') || '16';
  const sortType = searchParams.get('sort') || 'age';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredItems = filterQuery(products, query);

  const visibleItems = getFilterProducts(
    filteredItems,
    sortType,
    perPage,
    currentPage,
  );

  const totalProducts = filteredItems.length;
  const totalPages = Math.ceil(totalProducts / +perPage);

  useEffect(() => {
    setIsLoading(true);
    let fetch;

    switch (title) {
      case 'Mobile phones':
        fetch = getPhones;
        break;
      case 'Tablets':
        fetch = getTablets;
        break;
      case 'Accessories':
        fetch = getAccessories;
        break;
      default:
        fetch = getProducts;
        break;
    }

    fetch()
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="products">
      {query
        ? (
          <div className="products__section">
            <p className="products__count">
              {`${products.length} results`}
            </p>
          </div>
        ) : (
          <>
            <section className="products__section">
              <Breadcrumbs />
              <h1 className="products__title">
                {title}
              </h1>

              <p className="products__count">
                {products.length}
              </p>
            </section>

            <section className="products__section products__section--small">
              <div className="products__filters">

                <div className="products__filter">
                  <p
                    className="products__filter-dropdown-label"
                  >
                    Sort by
                  </p>

                  <Dropdown
                    options={sortOptions}
                    currentValue={sortType}
                    type={"sort"}
                  />
                </div>

                <div className="products__filter">
                  <label
                    className="products__filter-dropdown-label"
                    htmlFor="filter-dropdown"
                  >
                    Items on page
                  </label>

                  <Dropdown
                    options={paginationOptions}
                    currentValue={perPage}
                    type={"perPage"}
                    isSmall
                  />
                </div>
              </div>
            </section>
          </>
        )}


      {filteredItems.length > 0 && !isLoading && (
        <section className="products__section">
          <ProductsList
            products={visibleItems}
          />
        </section>

      )}

      {totalPages > 1 && filteredItems.length > 0 && (
        <Pagination
          total={totalProducts}
          perPage={perPage}
          currentPage={currentPage}
        />
      )}

      {isLoading && !products.length && (
        <Loader />
      )}

      {!products.length && !isLoading && (
        <NoResults
          category={title}
        />
      )}

      {products.length !== 0 && !filteredItems.length && !isLoading && (
        <NoSearchResult
          query={query}
        />
      )}
    </div>
  );
});
