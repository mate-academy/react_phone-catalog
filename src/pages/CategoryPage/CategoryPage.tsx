import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import './category-page.scss';
import { Breadcrumbs } from '../../components/UX/Breadcrumbs';
import { getCategoryTitle } from '../../services/getCategoryTitle';
import { DropdownType } from '../../types/DropdownType';
import { ProductCard } from '../../components/ProductCard';
import { Dropdown } from '../../components/UI/Dropdown/Dropdown';
import { getProducts } from '../../services/getProducts';
import { Loader } from '../../components/UX/Loader';
import { Product } from '../../types/Product';
import { ErrorModal } from '../../components/UX/ErrorModal';
import { NoResults } from '../../components/UX/NoResults';
import { NoResultsCaseName } from '../../types/NoResultsCase';
import { Pagination } from '../../components/UX/Pagination';
import {
  useProductsPreparation,
} from '../../customHooks/useProductsPreparation';
import { getSearchWith } from '../../services/getSearchWith';

export const CategoryPage = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryName = pathname.slice(1).split('/')[0];
  const title = getCategoryTitle(categoryName);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    visibleProducts,
    totalVisibleProducts,
    query,
    onPage,
    page,
  } = useProductsPreparation(products);
  const isPaginationVisible = totalVisibleProducts > onPage;
  const renderCount = useRef(0);

  const loadCategoryProducts = async () => {
    try {
      setProducts([]);
      setIsLoading(true);
      const productsFromServer = await getProducts();
      const categoryProducts = productsFromServer
        .filter(product => product.category === categoryName);

      setProducts(categoryProducts);
    } catch {
      setErrorMessage('Error occured while loading products from server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategoryProducts();
  }, [categoryName]);

  useEffect(() => {
    if (renderCount.current < 2) {
      renderCount.current += 1;

      return;
    }

    if (page && !isPaginationVisible) {
      const params = getSearchWith({ page: null }, searchParams);

      setSearchParams(params, { replace: true });
    }
  }, [page, onPage, renderCount.current]);

  return (
    <div className="category-page">
      <div className="category-page__breadcrumbs">
        <Breadcrumbs />
      </div>

      <h1 className="category-page__title">{title}</h1>

      <p className="category-page__models-count">
        {isLoading ? (
          'Loading . . .'
        ) : (
          `${products.length} models`
        )}
      </p>

      {isLoading && <Loader />}

      {(!isLoading && !products.length) && (
        <NoResults
          query={categoryName}
          caseName={NoResultsCaseName.EmptyCategory}
        />
      )}

      {(!isLoading && !!products.length && !totalVisibleProducts) && (
        <NoResults
          query={query}
          caseName={NoResultsCaseName.NoSearchResults}
        />
      )}

      {errorMessage && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}

      {(!isLoading && !!totalVisibleProducts) && (
        <>
          <div className="category-page__dropdowns">
            <Dropdown
              dropdownType={DropdownType.Sorter}
            />

            <Dropdown
              dropdownType={DropdownType.Paginator}
            />
          </div>

          <div className="category-page__product-cards">
            {visibleProducts.map(product => {
              return (
                <ProductCard
                  key={product.id}
                  hasDiscount
                  product={product}
                />
              );
            })}
          </div>

          {isPaginationVisible && (
            <Pagination
              totalItems={totalVisibleProducts}
              itemsPerPage={onPage}
              activePage={page}
            />
          )}
        </>
      )}
    </div>
  );
};
