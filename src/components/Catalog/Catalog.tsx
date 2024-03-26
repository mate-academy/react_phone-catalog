import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { debounce } from 'lodash';
import './Catalog.scss';
import { ProductCard } from '../ProductCard';
import { Amount, Product, Sort } from '../../type';
import { getSearchWith } from '../../utils/searchWith';
import { Params } from '../../type/Params';
import { PathRoute } from '../PathRoute/PathRoute';
import { NoSearchResults } from '../NoSearchResults';
import { DispatchContext, StateContext } from '../../store/ProductsContext';

type Props = {
  products?: Product[];
  title?: string;
};

export const Catalog: React.FC<Props> = ({ products = [], title = '' }) => {
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || Sort.AGE;
  const query = searchParams.get('query') || '';
  const page = +(searchParams.get('page') || 1);
  const perPage = +(searchParams.get('perPage') || 0);
  const [visibleQuery, setVisibleQuery] = useState(query);
  const [debounceQuery, setDebounceQuery] = useState(query);
  const { isShowMenu, errorMessage } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const setSearchWith = useCallback(
    (params: Params) => {
      const search = getSearchWith(params, searchParams);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    setSearchWith({ query: debounceQuery || null });
  }, [debounceQuery, setSearchWith]);

  const getPreparedProducts = useCallback(() => {
    let result = [...products];

    if (debounceQuery) {
      result = result.filter(r =>
        r.name.toLowerCase().includes(debounceQuery.toLowerCase()),
      );
    }

    result.sort((product1, product2) => {
      switch (sort) {
        case Sort.AGE:
          return product2[sort] - product1[sort];

        case Sort.NAME:
          return product1[sort].localeCompare(product2[sort]);

        case Sort.PRICE:
          return product1[sort] - product2[sort];

        default:
          return 0;
      }
    });

    return result;
  }, [debounceQuery, products, sort]);

  const sortedProducts = getPreparedProducts();

  const visibleProducts = useMemo(() => {
    const startIndex = page * perPage - perPage;
    const lastIndex = startIndex + perPage;

    if (perPage > 0) {
      return sortedProducts.slice(startIndex, lastIndex);
    }

    return sortedProducts;
  }, [page, perPage, sortedProducts]);

  const amountPages = useMemo(() => {
    const result = [];

    if (perPage) {
      const amount = Math.ceil(sortedProducts.length / +perPage);

      for (let i = 1; i <= amount; i += 1) {
        result.push(i);
      }
    }

    return result;
  }, [perPage, sortedProducts.length]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchWith({ sort: e.target.value, page: null });
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === Amount.ALL) {
      setSearchWith({ perPage: null, page: null });
    } else {
      setSearchWith({ perPage: e.target.value, page: null });
    }
  };

  const changeQuery = useMemo(() => debounce(setDebounceQuery, 1000), []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisibleQuery(e.target.value);
    changeQuery(e.target.value.trim());
    setSearchWith({ page: null });
  };

  const handleCurrentPage = (number: number) => {
    if (number !== page) {
      setSearchWith({ page: number });
      window.scroll(0, 0);
      setDisableNext(false);
      setDisablePrev(false);
    }

    if (number === 1) {
      setDisablePrev(true);
    }

    if (Array.isArray(amountPages) && number === amountPages.length) {
      setDisableNext(true);
    }
  };

  const hadleNextPage = () => {
    if (Array.isArray(amountPages)) {
      if (page < amountPages.length) {
        setDisablePrev(false);
        setSearchWith({ page: page + 1 });
        window.scroll(0, 0);
      }

      if (page + 1 === amountPages.length) {
        setDisableNext(true);
      }
    }
  };

  const hadlePrevPage = () => {
    if (page > 1) {
      setDisableNext(false);
      setSearchWith({ page: page - 1 });
      window.scroll(0, 0);
    }

    if (page - 1 === 1) {
      setDisablePrev(true);
    }
  };

  const handleClearSearch = () => {
    setVisibleQuery('');
    setDebounceQuery('');
  };

  return (
    <div className="Catalog">
      <PathRoute />

      <h1 className="Catalog__title">{title}</h1>
      <div className="Catalog__amount">{`${sortedProducts.length} models`}</div>

      {!products.length && !errorMessage && (
        <h1>{`There are no ${title} yet`}</h1>
      )}

      {errorMessage && (
        <div className="Error">
          <h2 className="Error__text">{errorMessage}</h2>
          <button
            type="button"
            className="Error__reload"
            onClick={() => {
              dispatch({ type: 'reload', payload: true });
            }}
          >
            Reload
          </button>
        </div>
      )}

      {!!products.length && (
        <>
          <div className="Catalog__choose">
            <div className="Catalog__choose-item Catalog__choose-item--sort">
              <label htmlFor="sortBy" className="Catalog__choose-label">
                Sort by
              </label>
              <select
                value={sort}
                name="sortBy"
                id="sortBy"
                className="Catalog__choose-select"
                onChange={e => handleSortChange(e)}
              >
                <option value={Sort.AGE}>Newest</option>
                <option value={Sort.NAME}>Alphabetically</option>
                <option value={Sort.PRICE}>Cheapest</option>
              </select>
            </div>
            <div className="Catalog__choose-item Catalog__choose-item--amount">
              <label htmlFor="amount" className="Catalog__choose-label">
                Items on page
              </label>
              <select
                value={perPage}
                name="amountPages"
                id="amount"
                className="Catalog__choose-select"
                onChange={e => handlePerPageChange(e)}
              >
                <option value={Amount.ALL}>all</option>
                <option value={Amount.FOUR}>4</option>
                <option value={Amount.EIGHT}>8</option>
                <option value={Amount.SIXTEEN}>16</option>
              </select>
            </div>
            {!isShowMenu && (
              <div className="Catalog__search">
                <input
                  type="text"
                  value={visibleQuery}
                  placeholder="Search"
                  name="Search"
                  id="search"
                  className="Catalog__search-field"
                  onChange={e => handleQueryChange(e)}
                />
                {query && (
                  <button
                    type="button"
                    className="Catalog__search-clearSearch"
                    onClick={handleClearSearch}
                  >
                    <img src="icons/Close.svg" alt="Clear search" />
                  </button>
                )}
              </div>
            )}
          </div>

          {!!visibleProducts.length ? (
            <div className="Catalog__content" data-cy="productList">
              {visibleProducts.map(product => (
                <div className="Catalog__content-item" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <NoSearchResults />
          )}

          {Array.isArray(amountPages) && amountPages.length > 1 && (
            <div className="Catalog__page-number" data-cy="pagination">
              <div className="Catalog__page-buttons">
                <button
                  data-cy="paginationLeft"
                  type="button"
                  className="Catalog__page-buttons-item"
                  aria-label="previous"
                  onClick={hadlePrevPage}
                  disabled={disablePrev}
                >
                  <img
                    src={
                      disablePrev
                        ? 'icons/Arrow_left_disable.svg'
                        : 'icons/Arrow_Left_small.svg'
                    }
                    alt="previous"
                    className="arrow-disabled"
                  />
                </button>

                <div className="Catalog__page-list">
                  {amountPages.map(number => (
                    <button
                      key={number}
                      type="button"
                      className={classNames('Catalog__page-list-item', {
                        'Catalog__page-list-item--active':
                          number === page || (!page && number === 1),
                      })}
                      aria-label="Number page"
                      onClick={() => handleCurrentPage(number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                <button
                  data-cy="paginationRight"
                  type="button"
                  className="Catalog__page-buttons-item"
                  aria-label="next"
                  onClick={hadleNextPage}
                  disabled={disableNext}
                >
                  <img
                    src={
                      disableNext
                        ? 'icons/Arrow_right_disable.svg'
                        : 'icons/Arrow_Right_small.svg'
                    }
                    alt="next"
                  />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
