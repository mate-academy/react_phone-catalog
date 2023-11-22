/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone } from '../../types/phone';
import { Params } from '../../types/params';

import { Loader } from '../Loader';
import { BreadCrumbs } from '../BreadCrumbs';
import { Dropdown } from '../Dropdown';
import { ProductsList } from '../ProductsList';
import { Pagination } from '../Pagination';
import { SearchTypes } from '../../types/searchType';
import { LoadingError } from '../LoadingError';
import { NoResults } from '../NoResults';

import { getPhones } from '../../api/products';

import {
  sortOptions,
  paginationOptions,
  getSearchParams,
  getVisibleItems,
  filterQuery,
} from './utils';

import './productslayout.scss';
import { NoSearchResults } from '../NoSearchResults';
import { handleScrollToTop } from '../Footer/utils';

type Props = {
  title: string;
};

export const ProductsLayout: React.FC<Props> = ({ title }) => {
  const [products, setProducts] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery
    = searchParams.get(SearchTypes.Sort) || sortOptions[0].value;
  const perPageQuery
    = searchParams.get(SearchTypes.PerPage) || paginationOptions[0].value;
  const pageQuery = searchParams.get(SearchTypes.Page) || '1';
  const searchQuery = searchParams.get(SearchTypes.Query) || '';

  const filteredItems = filterQuery(products, searchQuery);

  const visibleItems = getVisibleItems(
    filteredItems,
    sortByQuery,
    perPageQuery,
    +pageQuery,
  );

  const isTooFewItems = filteredItems.length <= +perPageQuery;

  const setSearch = (params: Params) => {
    const search = getSearchParams(params, searchParams);

    setSearchParams(search);
  };

  const onSortChange = (newSort: string) => {
    setSearch({ [SearchTypes.Sort]: newSort, [SearchTypes.Page]: '1' });
  };

  const onPerPageChange = (newPerPage: string) => {
    setSearch({ [SearchTypes.PerPage]: newPerPage, [SearchTypes.Page]: '1' });
  };

  const onPageChange = (newPage: number) => {
    setSearch({ [SearchTypes.Page]: newPage.toString() });

    handleScrollToTop();
  };

  useEffect(() => {
    let fetchFuntion;

    if (title === 'Mobile Phones') {
      fetchFuntion = getPhones;
    } else {
      setIsLoading(false);

      return;
    }

    fetchFuntion()
      .then((result) => {
        if (!result) {
          throw new Error();
        }

        setProducts(result);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <div className="products-layout">
      <section className="products-layout__section">
        <BreadCrumbs />
      </section>

      <section className="products-layout__section">
        <h1 className="products-layout__title">{title}</h1>

        <p className="products-layout__models">
          {`${products.length} models`}
          {searchQuery && ` / ${filteredItems.length} results`}
        </p>
      </section>

      <section
        className="
          products-layout__section
          products-layout__section--small
          "
      >
        <div className="products-layout__sort">
          <div className="products-layout__dropdown">
            <span className="products-layout__dropdown-title">Sort by</span>

            <Dropdown
              options={sortOptions}
              currentValue={sortByQuery}
              onChange={onSortChange}
            />
          </div>

          <div className="products-layout__dropdown">
            <span className="products-layout__dropdown-title">
              Items on page
            </span>

            <Dropdown
              options={paginationOptions}
              currentValue={perPageQuery}
              onChange={onPerPageChange}
              isSmall
            />
          </div>
        </div>
      </section>

      {hasError ? (
        <LoadingError />
      ) : (
        <>
          {products.length === 0 ? (
            <NoResults />
          ) : (
            <>
              {filteredItems.length === 0 ? (
                <NoSearchResults />
              ) : (
                <>
                  <section
                    className="products-layout__section"
                    data-cy="productList"
                  >
                    <ProductsList products={visibleItems} />
                  </section>

                  {perPageQuery !== 'all' && !isTooFewItems && (
                    <section
                      className="products-layout__section"
                      data-cy="pagination"
                    >
                      <Pagination
                        total={filteredItems.length}
                        perPage={perPageQuery}
                        currentPage={+pageQuery}
                        onPageChange={onPageChange}
                      />
                    </section>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
