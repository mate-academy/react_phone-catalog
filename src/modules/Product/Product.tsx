import { Dropdown } from '../shared/components/Dropdown';
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Product as ProductType } from '../shared/components/types/Product';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';

import './../shared/styles/Arrow-btn.scss';
import './Product.scss';
import { getProducts } from '../utils/getProduct';
import { StateContext } from '../utils/GlobalStateProvider';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/getSearchWith';
import { SortTypes } from '../shared/components/types/SortTypes';
import { ItemsOnPage } from '../shared/components/types/ItemsOnPage';
// import { debounce } from 'lodash';
import { createArray, isAllItems } from '../utils/createArrayIsAllItems';
import { ProductCards } from '../shared/components/ProductCards';
import classNames from 'classnames';
import { debounce } from '../utils/debounce';

type Props = {
  category: 'phones' | 'tablets' | 'accessories';
  title: string;
};

const sortProducts = (products: ProductType[], sortBy: SortTypes) => {
  switch (sortBy) {
    case SortTypes.price:
      return products.sort((prod1, prod2) => prod1.price - prod2.price);
    case SortTypes.title:
      return products.sort((prod1, prod2) =>
        prod1.name.localeCompare(prod2.name),
      );
    default:
      return products.sort((prod1, prod2) => prod2.year - prod1.year);
  }
};

// eslint-disable-next-line react/display-name
export const Product: React.FC<Props> = memo(({ title, category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cardsOnPage = (searchParams.get('perPage') || 'all') as ItemsOnPage;
  const sortBy = (searchParams.get('sort') as SortTypes) || SortTypes.age;
  const page = +((searchParams.get('page') as SortTypes) || 1);
  const query = searchParams.get('query') || '';

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonsArray, setButtonsArray] = useState<number[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSearchWith = (params: any) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const [productsOnPage, setProductsOnPage] = useState<ProductType[]>([]);
  const [productsLen, setProductsLen] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { minLoadDelay, isDarkThemeOn } = useContext(StateContext);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSearchWith({ query: e.target.value.toLocaleLowerCase() });

      return;
    }

    setSearchWith({ query: null });
  };

  const handleReset = () => {
    setSearchWith({ query: null });

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResults = useCallback(debounce(handleQuery, 300), [category]);

  useEffect(() => {
    if (!query && inputRef.current) {
      inputRef.current.value = '';
    }

    setIsLoading(true);
    setIsError(false);

    getProducts('api/products.json')
      .then(products => {
        const requiredTypeOfProducts = products.filter(
          product => product.category === category,
        );

        const filteredProducts = sortProducts(
          requiredTypeOfProducts.filter(product =>
            product.name.toLocaleLowerCase().includes(query.trim()),
          ),
          sortBy,
        );

        const btns = createArray(
          filteredProducts.length,
          isAllItems(cardsOnPage, filteredProducts.length),
        );

        setProductsLen(requiredTypeOfProducts.length);

        setProductsOnPage(
          filteredProducts.slice(
            (page - 1) * isAllItems(cardsOnPage, products.length),
            (page - 1) * isAllItems(cardsOnPage, products.length) +
              isAllItems(cardsOnPage, products.length),
          ),
        );

        setButtonsArray(btns);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, minLoadDelay);
      });

      document.title = 'Phone catalog ' + category;
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, cardsOnPage, sortBy, category, query]);

  useEffect(() => {
    setSearchWith({ page: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardsOnPage]);

  return (
    <>
      <main className="product product--margin" id="welcome">
        <Breadcrumbs />

        <div className="product__info">
          <h1 className="product__title">{title}</h1>
          <p className="product__text">{productsLen} models</p>
        </div>

        {isError ? (
          <div className="product__error">
            <h1>Something went wrong. Please retry! &#128533;</h1>
            <button className="product__error-btn">
              <Link to="/" className="product__error-link">
                Retry
              </Link>
            </button>
          </div>
        ) : (
          <React.Fragment>
            <div className="product__sort">
              <div className="product__sort--left-wrapper">
                <div className="product__sort-year">
                  <small>Sort by</small>
                  <Dropdown
                    items={[SortTypes.age, SortTypes.title, SortTypes.price]}
                    searchParam="sort"
                    activeElem={sortBy}
                  />
                </div>
                <div className="product__sort-items">
                  <small>Items on page</small>
                  <Dropdown
                    items={['all', 4, 8, 16]}
                    searchParam="perPage"
                    activeElem={cardsOnPage}
                  />
                </div>
              </div>
              <div className="product__sort-search">
                <small>Find product</small>
                <div
                  className={classNames('product__sort-input--wrapper', {
                    'product__sort-input--wrapper-light': !isDarkThemeOn,
                  })}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    name="search"
                    id="search"
                    defaultValue={query}
                    className={classNames('product__sort-input')}
                    placeholder={`Search for ${category}`}
                    maxLength={75}
                    onChange={debouncedResults}
                  />
                  {query && (
                    <button
                      className="product__sort-input--cancel"
                      onClick={handleReset}
                    ></button>
                  )}
                </div>
              </div>
            </div>
            {productsOnPage.length > 0 ? (
              <ProductCards
                buttonsArray={buttonsArray}
                isLoading={isLoading}
                productsOnPage={productsOnPage}
                paginationEnabled={true}
              />
            ) : (
              <div className="product__not-found">
                <h1>There are no {category} matching the query &#128547;</h1>
              </div>
            )}
          </React.Fragment>
        )}
      </main>
      <Outlet />
    </>
  );
});
