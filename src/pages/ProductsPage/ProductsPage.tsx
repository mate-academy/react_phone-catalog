import {
  FC, useEffect, useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Notification } from '../../components/Notification/Notification';
import { NotificationMessage } from '../../types/NotificationMessage';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { itemsPerPageOptions, sortOptions } from '../../helpers/options';
import { getLabel } from '../../helpers/getLabel';
import { sortProducts } from '../../helpers/sortProducts';
import { filterProducts } from '../../helpers/filterProducts';
import { useAppSelector } from '../../app/hooks';
import { Pagination } from '../../components/Pagination/Pagination';
import { getSearchWith } from '../../helpers/searchHelper';
import { calculateItemRange } from '../../helpers/calculateItemRange';
import { ProductCategory } from '../../types/ProductCategory';

import './ProductsPage.scss';

type Props = {
  products: Product[];
  hasError: boolean;
  isLoading: boolean;
  pageTitle: string;
  productsCategory: ProductCategory;
};

export const ProductsPage: FC<Props> = ({
  products,
  hasError,
  isLoading,
  pageTitle,
  productsCategory,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    appliedSearchQuery,
    isSearchLoading,
  } = useAppSelector(store => store.search);

  const sort = searchParams.get('sort') || '';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '16';

  const isAllItems = useMemo(() => perPage === 'all', [perPage]);

  const currentSortOption = useMemo(() => getLabel(sortOptions, sort), [sort])
  || 'Choose option';

  const currentItemsPerPageOption = useMemo(
    () => getLabel(itemsPerPageOptions, perPage),
    [perPage],
  )
  || perPage;

  const sortedProducts = useMemo(
    () => sortProducts(products, sort),
    [products, sort],
  );

  const filteredProducts = useMemo(() => {
    return filterProducts(sortedProducts, appliedSearchQuery);
  }, [sortedProducts, appliedSearchQuery]);

  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / +perPage),
    [filteredProducts.length, perPage],
  );

  const itemsPerPage = useMemo(() => {
    return isAllItems
      ? filteredProducts
      : calculateItemRange(page, perPage, filteredProducts);
  }, [page, perPage, filteredProducts]);

  const shouldHidePagination = useMemo(
    () => filteredProducts.length < 5,
    [filteredProducts],
  );

  const renderProducts = () => {
    return filteredProducts.length ? (
      <div className="products__list">
        <ProductsList products={itemsPerPage} />
      </div>
    ) : (
      <Notification message={NotificationMessage.NoMatchingProducts} />
    );
  };

  let content;

  if (!isSearchLoading) {
    content = renderProducts();
  } else {
    content = <Loader />;
  }

  useEffect(() => {
    setSearchParams(
      getSearchWith(searchParams, shouldHidePagination
        ? { page: null, perPage: null }
        : { page: '1', perPage }),
    );
  }, [perPage, shouldHidePagination]);

  return (
    <div className="products-page">
      <section className="products">
        <div className="products__wrapper">
          <div className="products__nav">
            <Breadcrumbs />
          </div>

          <h1 className="products__title">{pageTitle}</h1>

          {!!filteredProducts.length && !isSearchLoading && (
            <>
              <div className="products__count">
                {`${filteredProducts.length} ${filteredProducts.length === 1 ? 'item' : 'items'}`}
              </div>

              <div className="products__filter-wrapper">
                <div
                  className="products__filter-container
                    products__filter-container--sort-by"
                >
                  <p className="products__filter-description">
                    Sort by
                  </p>
                  <Dropdown
                    currentOption={currentSortOption}
                    searchName="sort"
                    options={sortOptions}
                  />
                </div>

                {!shouldHidePagination && (
                  <div
                    className="products__filter-container
                      products__filter-container--items-per-page"
                  >
                    <p className="products__filter-description">
                      Items on page
                    </p>
                    <Dropdown
                      currentOption={currentItemsPerPageOption}
                      searchName="perPage"
                      options={itemsPerPageOptions}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {isLoading && <Loader />}

        {hasError
          && <Notification message={NotificationMessage.FetchError} />}

        {!isLoading && !hasError && !!products.length && (
          content
        )}

        {!products.length && !isLoading && !hasError
          && <Notification message={`Sorry, no ${productsCategory} are currently available`} />}

        {!shouldHidePagination && (
          !!filteredProducts.length && !isSearchLoading && !isAllItems && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
            />
          )
        )}
      </section>
    </div>
  );
};
