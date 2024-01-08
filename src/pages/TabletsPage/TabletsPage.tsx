import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './TabletsPage.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { SortDropdown } from '../../components/SortDropdown/SortDropdown';
import { ITEMS_PER_PAGE, SORT_BY } from '../../helpers/constants';
import { Categories, SearchParams } from '../../types/Categories';
import { ProductList } from '../../components/ProductList/ProductList';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader/Loader';
import {
  ErrorNotification,
} from '../../components/ErrorNotification/ErrorNotification';
import { applyFilterAndSort } from '../../helpers/applyFilterAndSort';
import {
  NoSearchResults,
} from '../../components/NoSearchResults/NoSearchResults';
import { Pagination } from '../../components/Pagination/Pagination';
import { getProductsByCategoty } from '../../api/products';

export const TabletsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);

  const filteredProducts = applyFilterAndSort(products, searchParams);
  const total = filteredProducts.length;
  const currentPage = +(searchParams.get(SearchParams.Page) || '1');
  const perPage = +(searchParams.get(SearchParams.PerPage) || '') || total;
  const pagesAmount = Math.ceil(total / perPage);

  const firstItem = currentPage * +perPage - perPage;
  const lastItem
    = perPage * currentPage < total ? perPage * currentPage : total;

  const visibleProducts = filteredProducts.slice(firstItem, lastItem);

  useEffect(() => {
    setIsLoading(true);

    getProductsByCategoty(Categories.Tablets)
      .then(setProducts)
      .catch(() => {
        setIsLoadError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="ProductPage">
      <BreadCrumbs />

      <h1 className="ProductPage__title">Tablets</h1>

      {isLoading && <Loader />}

      {!isLoading && isLoadError && <ErrorNotification />}

      {!isLoading && !isLoadError && (
        <div className="ProductPage__content">
          <p className="ProductPage__amount">{`${products.length} models`}</p>

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
