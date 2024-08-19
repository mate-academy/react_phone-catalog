import React, { useCallback, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import './AccessoriesPage.scss';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import { ProductsList } from '../ProductsList';
import { Product } from '../../types/Product';
import { Loader } from '../Loader';
import { getProducts } from '../../api/fetchClient';

const sortParameters = ['Newest', 'Alphabetically', 'Cheapest'];
const perPageOptions = ['all', '4', '8', '16'];

export const AccessoriesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const darkTheme = useOutletContext<boolean>();

  const [isSortDropDownVisible, setIsSortDropDownVisible] = useState(false);
  const [isPerPageDropDownVisible, setIsPerPageDropDownVisible] =
    useState(false);

  const [translate, setTranslate] = useState(0);

  const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState(true);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [noProductsMessage, setNoProductsMessage] = useState(false);
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = useMemo(() => debounce(setAppliedQuery, 1000), []);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortParameter = searchParams.get('sort') || 'Newest';
  const perPage = searchParams.get('perpage') || 'all';
  const page = +(searchParams.get('page') || 1);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setLoader(true);

    getProducts()
      .then(setProducts)
      .catch(error => {
        setErrorMessage(true);
        throw error;
      })
      .finally(() => setLoader(false));
  }, []);

  const handleSetPageSearchParameter = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams);

      params.set('page', `${pageNumber}`);

      if (pageNumber === 1) {
        params.delete('page');
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handleSetSortSearchParameter = useCallback(
    (newSortParameter: string) => {
      const params = new URLSearchParams(searchParams);

      params.set('sort', newSortParameter);
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handleSetPerPageSearchParameter = useCallback(
    (newPerPageParameter: string) => {
      const params = new URLSearchParams(searchParams);

      params.set('perpage', newPerPageParameter);

      if (newPerPageParameter === 'all') {
        params.delete('perpage');
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handleSetQuerySearchParameter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);

      params.set('query', `${event.target.value}`);

      applyQuery(event.target.value);

      if (event.target.value === '') {
        params.delete('query');
      }

      setSearchParams(params);
    },
    [applyQuery, searchParams, setSearchParams],
  );

  const handlePaginationPrev = () => {
    if ((page + 3) % 4 === 0) {
      setTranslate(currentTranslate => currentTranslate + 160);
    }

    handleSetPageSearchParameter(page - 1);
  };

  const handlePaginationNext = () => {
    if (page % 4 === 0) {
      setTranslate(currentTranslate => currentTranslate - 160);
    }

    handleSetPageSearchParameter(page + 1);
  };

  const productsFromServer = products.filter(product => {
    return product.category === 'accessories';
  });

  const numberOfModels = productsFromServer.length;

  const sortedProducts = productsFromServer.sort((product1, product2) => {
    switch (sortParameter) {
      case 'Newest':
        return product1.year < product2.year ? 1 : -1;

      case 'Alphabetically':
        return product1.name.localeCompare(product2.name);

      case 'Cheapest':
        return product1.price > product2.price ? 1 : -1;

      default:
        return product1.year < product2.year ? 1 : -1;
    }
  });

  const resultProducts = useMemo(() => {
    return sortedProducts.filter(prod =>
      prod.name.toLocaleLowerCase().includes(appliedQuery.toLocaleLowerCase()),
    );
  }, [appliedQuery, sortedProducts]);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return resultProducts;
    } else {
      return resultProducts.slice(
        +perPage * (page - 1),
        +perPage * (page - 1) + +perPage,
      );
    }
  }, [page, perPage, resultProducts]);

  let numberOfPages = 1;

  if (perPage !== 'all') {
    numberOfPages = Math.ceil(resultProducts.length / +perPage);
  }

  const allPagesArray = [];

  for (let i = 1; i <= numberOfPages; i++) {
    allPagesArray.push(i);
  }

  useEffect(() => {
    if (page === 1) {
      setIsPrevButtonDisabled(true);
    }

    if (page > 1) {
      setIsPrevButtonDisabled(false);
    }

    if (page === numberOfPages) {
      setIsNextButtonDisabled(true);
    }

    if (page < numberOfPages) {
      setIsNextButtonDisabled(false);
    }

    if (page > numberOfPages) {
      handleSetPageSearchParameter(numberOfPages);
    }
  }, [handleSetPageSearchParameter, numberOfPages, page]);

  useEffect(() => {
    if (page === 1) {
      setTranslate(0);
    }

    if (page > numberOfPages && numberOfPages > 4 && numberOfPages % 4 !== 0) {
      setTranslate(-((numberOfPages - 1) * 40));
      handleSetPageSearchParameter(numberOfPages);
    }

    if (page > numberOfPages && numberOfPages > 4 && numberOfPages % 4 === 0) {
      setTranslate(-((numberOfPages - 4) * 40));
      handleSetPageSearchParameter(numberOfPages);
    }

    if (page > numberOfPages && numberOfPages < 4) {
      setTranslate(0);
      handleSetPageSearchParameter(numberOfPages);
    }
  }, [handleSetPageSearchParameter, numberOfPages, page]);

  useEffect(() => {
    if (visibleProducts.length === 0) {
      setNoProductsMessage(true);
    } else {
      setNoProductsMessage(false);
    }
  }, [visibleProducts]);

  return (
    <main>
      {loader && <Loader />}
      {errorMessage && !loader && (
        <div className="error-page">
          <p className="error-page__message">Something went wrong</p>
          <button
            className="error-page__reload-button add-to-cart-button"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      )}

      {noProductsMessage && !errorMessage && !loader && !query && (
        <div className="error-page">
          <p className="error-page__message">{'There are no Accessories'}</p>
        </div>
      )}

      {query && resultProducts.length === 0 && (
        <div className="error-page">
          <p className="error-page__message">
            {'There are no accessories matching the query'}
          </p>
        </div>
      )}

      {!errorMessage && !noProductsMessage && !loader && (
        <section className="product-page">
          <div className="product-page__bread-crumbs bread-crumbs">
            <Link
              to="/"
              className={cn('bread-crumbs__home-link icon-home', {
                'bread-crumbs__home-link--dark-theme': darkTheme,
              })}
            ></Link>
            <div className="bread-crumbs__arrow icon-arrow-right"></div>
            <Link to="." className="bread-crumbs__link bread-crumbs__link">
              Accessories
            </Link>

            <input
              type="text"
              className="query-input"
              value={query}
              placeholder="Search..."
              onChange={handleSetQuerySearchParameter}
            />
          </div>

          <h1 className="product-page__title title title--big">Accessories</h1>

          <p className="product-page__number-of-models">{`${numberOfModels} models`}</p>

          <div className="product-page__actions">
            <div
              className="product-page__action"
              onBlur={() => {
                setTimeout(() => setIsSortDropDownVisible(false), 200);
              }}
            >
              <p className="product-page__action-name">Sort by</p>
              <div className="product-page__drop-down  drop-down">
                <button
                  type="button"
                  className={cn('drop-down__sort-trigger', {
                    'drop-down__sort-trigger--rotate-arrow':
                      isSortDropDownVisible,
                  })}
                  onClick={() =>
                    setIsSortDropDownVisible(!isSortDropDownVisible)
                  }
                >
                  {sortParameter}
                </button>
                <div
                  className={cn('drop-down__content', {
                    'drop-down__content--visible': isSortDropDownVisible,
                  })}
                >
                  <ul className="drop-down__list">
                    {sortParameters.map(parameter => (
                      <li
                        key={parameter}
                        onClick={() => handleSetSortSearchParameter(parameter)}
                      >
                        {parameter}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div
              className="product-page__action"
              onBlur={() => {
                setTimeout(() => setIsPerPageDropDownVisible(false), 200);
              }}
            >
              <p className="product-page__action-name">Items on page</p>
              <div className="product-page__drop-down  drop-down">
                <button
                  type="button"
                  className={cn('drop-down__per-page-trigger', {
                    'drop-down__per-page-trigger--rotate-arrow':
                      isPerPageDropDownVisible,
                  })}
                  onClick={() =>
                    setIsPerPageDropDownVisible(!isPerPageDropDownVisible)
                  }
                >
                  {perPage}
                </button>
                <div
                  className={cn('drop-down__content', {
                    'drop-down__content--visible': isPerPageDropDownVisible,
                  })}
                >
                  <ul className="drop-down__list">
                    {perPageOptions.map(parameter => (
                      <li
                        key={parameter}
                        onClick={() => {
                          handleSetPerPageSearchParameter(parameter);
                        }}
                      >
                        {parameter}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <ProductsList products={visibleProducts} />

          {numberOfPages > 1 && (
            <div className="product-page__pagination-buttons">
              <button
                disabled={isPrevButtonDisabled}
                type="button"
                className={cn(
                  'product-page__pagination-prev button icon-arrow-left',
                  {
                    'button--disabled': isPrevButtonDisabled,
                    'button--dark-theme': darkTheme,
                    'button--dark-theme-disabled':
                      isPrevButtonDisabled && darkTheme,
                  },
                )}
                onClick={handlePaginationPrev}
              ></button>

              <div className="product-page__page-buttons">
                <ul
                  className="product-page__page-buttons-list"
                  style={{
                    transform: `translateX(${translate}px)`,
                  }}
                >
                  {allPagesArray.map(pageNumber => (
                    <li
                      className={cn('button', {
                        'button--page-selected': page === pageNumber,
                      })}
                      key={pageNumber}
                      onClick={() => {
                        handleSetPageSearchParameter(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                disabled={isNextButtonDisabled}
                type="button"
                className={cn(
                  'product-page__pagination-netx button icon-arrow-right',
                  {
                    'button--disabled': isNextButtonDisabled,
                    'button--dark-theme': darkTheme,
                    'button--dark-theme-disabled':
                      isNextButtonDisabled && darkTheme,
                  },
                )}
                onClick={handlePaginationNext}
              ></button>
            </div>
          )}
        </section>
      )}
    </main>
  );
};
