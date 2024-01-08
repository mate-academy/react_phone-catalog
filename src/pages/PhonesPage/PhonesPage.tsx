import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import './PhonesPage.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { SortDropdown } from '../../components/SortDropdown/SortDropdown';
import { ITEMS_PER_PAGE, SORT_BY } from '../../helpers/constants';
import { SearchParams } from '../../types/Categories';
import { ProductList } from '../../components/ProductList/ProductList';
import { Loader } from '../../components/Loader/Loader';
import {
  ErrorNotification,
} from '../../components/ErrorNotification/ErrorNotification';
import { applyFilterAndSort } from '../../helpers/applyFilterAndSort';
import {
  NoSearchResults,
} from '../../components/NoSearchResults/NoSearchResults';
import { Pagination } from '../../components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as productsActions from '../../features/productSlicer';

export const PhonesPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const { items: products, loading, hasError } = useAppSelector(
    (state) => state.products,
  );

  const filteredProducts = useMemo(() => {
    return applyFilterAndSort(products, searchParams);
  }, [products, searchParams]);

  const total = filteredProducts.length;
  const currentPage = +(searchParams.get(SearchParams.Page) || '1');
  const perPage = +(searchParams.get(SearchParams.PerPage) || '') || total;
  const query = searchParams.get(SearchParams.Query);
  const pagesAmount = Math.ceil(total / perPage);

  const firstItem = currentPage * +perPage - perPage;
  const lastItem
    = perPage * currentPage < total ? perPage * currentPage : total;

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(firstItem, lastItem);
  }, [filteredProducts, firstItem, lastItem]);

  useEffect(() => {
    if (!products.length) {
      dispatch(productsActions.productsInit());
    }
  }, [dispatch, products]);

  return (
    <div className="ProductPage">
      <BreadCrumbs />

      <h1 className="ProductPage__title">Mobile phones</h1>

      {loading && <Loader />}

      {!loading && hasError && <ErrorNotification />}

      {!loading && !hasError && (
        <div className="ProductPage__content">
          <p className="ProductPage__amount">
            {!query
              ? `${products.length} models`
              : `${filteredProducts.length} models of ${products.length}`}
          </p>

          {!!products.length && (
            <div className="ProductPage__control">
              <SortDropdown
                label="Sort by"
                options={SORT_BY}
                searchParam={SearchParams.Sort}
              />

              <SortDropdown
                label="Items per page"
                defaultOption={ITEMS_PER_PAGE.All}
                options={ITEMS_PER_PAGE}
                searchParam={SearchParams.PerPage}
              />
            </div>
          )}

          {visibleProducts.length ? (
            <ProductList products={visibleProducts} />
          ) : (
            <>
              {!!searchParams.toString().length && <NoSearchResults />}
              {!searchParams.toString().length && (
                <div className="ProductPage__out-stock">
                  <p className="ProductPage__out-stock-big">
                    Seems like products are out of stock...
                  </p>
                  Our team is already working on supplying. Please, come back
                  later.
                </div>
              )}
            </>
          )}

          {!!filteredProducts.length && pagesAmount !== 1 && (
            <Pagination pagesAmount={pagesAmount} currentPage={currentPage} />
          )}
        </div>
      )}
    </div>
  );
};
