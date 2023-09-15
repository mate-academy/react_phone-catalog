/* eslint-disable no-console */
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './category-page.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { getCategoryTitle } from '../../services/getCategoryTitle';
import { DropdownType } from '../../types/Dropdown';
import { ProductCard } from '../../components/ProductCard';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { getProducts } from '../../services/getProducts';
import { Loader } from '../../components/Loader';
import { Product } from '../../types/Product';
import { ErrorModal } from '../../components/UX/ErrorModal';
import { NoResults } from '../../components/NoResults';
import { NoResultsCaseName } from '../../types/NoResultsCase';
import { Pagination } from '../../components/Pagination';

export const CategoryPage = () => {
  const location = useLocation();
  const categoryName = location.pathname.slice(1).split('/')[0];
  const title = getCategoryTitle(categoryName);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const loadCategoryProducts = async () => {
    try {
      setProducts(null);
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

  return (
    <div className="category-page">
      <div className="category-page__breadcrumbs">
        <Breadcrumbs />
      </div>

      <h1 className="category-page__title">{title}</h1>

      <p className="category-page__models-count">
        {products ? (
          `${products.length} models`
        ) : (
          'Searching . . .'
        )}
      </p>

      {isLoading && <Loader />}

      {errorMessage && (
        <ErrorModal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}

      {products && (
        <>
          {products.length ? (
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
                {products.map(product => {
                  return (
                    <ProductCard
                      key={product.id}
                      hasDiscount
                      product={product}
                    />
                  );
                })}
              </div>

              <Pagination
                totalItems={71}
                itemsPerPage={4}
                activePage={10}
              />
            </>

          ) : (
            <>
              <NoResults
                query={categoryName}
                caseName={NoResultsCaseName.EmptyCategory}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
