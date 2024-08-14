/* eslint-disable max-len */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Accessorie } from '../../types/accessories';
import { Phone } from '../../types/phone';
import { Tablet } from '../../types/tablets';
import { Path } from '../Path/Path';
import './Catalog.scss';
import { DispatchContext, StateContext } from '../../context/ContextReducer';
import cn from 'classnames';
import { ParamsSortBy } from '../../types/params';
import { getSearchWith } from '../../utils/searchHelper';
import { filterDevice } from '../../utils/filterDevice';
import { BrandItem } from '../ItemDevice/itemDevice';
import { debounce } from '../../utils/debounce';

interface Props {
  devices: Phone[] | Tablet[] | Accessorie[] | (Phone | Tablet | Accessorie)[];
  titleCatalog: string;
  nonCatalog: boolean;
}

export const Catalog: React.FC<Props> = ({
  devices,
  titleCatalog,
  nonCatalog,
}) => {
  const {
    itemDevice,
    sortByDropdown,
    perPageDropdown,
    paginPages = [],
    product,
    favoritesDevice = [],
    darkThem,
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const [sortDevices, setSortDevices] =
    useState<(Phone | Tablet | Accessorie)[]>(devices);

  const perPage = searchParams.get('perPage') || '8';
  const paginPage = searchParams.get('paginPage') || '1';

  const filteredAndSortDevices = sortDevices.slice(
    +perPage * +paginPage - +perPage,
    +perPage * +paginPage,
  );

  const renderDevices =
    searchParams.get('perPage') === 'all'
      ? sortDevices
      : filteredAndSortDevices;

  const favorites =
    titleCatalog === 'Favorites' ? favoritesDevice : renderDevices;

  useEffect(() => {
    const sortDevice = filterDevice(devices, searchParams, product).filter(
      (d: Phone | Tablet | Accessorie) =>
        d.name
          .toUpperCase()
          .includes(searchParams.get('query')?.toUpperCase() ?? ''),
    );

    setSortDevices(sortDevice);

    dispatch({
      type: 'setPaginPage',
      payload: Array.from(
        { length: Math.ceil(sortDevice.length / +perPage) },
        (_, index) => index + 1,
      ),
    });
  }, [searchParams, favoritesDevice.length]);

  const { pathname } = useLocation();

  const handleSortLink = (p?: string) => {
    if (p) {
      setSearchParams(getSearchWith(searchParams, { sort: p }));
    }

    dispatch({ type: 'setSortByDropdown' });
    dispatch({ type: 'setPerPageDropdown', delete: 'close' });
  };

  const handlePerPageLink = (p?: string) => {
    if (p) {
      setSearchParams(
        getSearchWith(searchParams, { perPage: p, paginPage: null }),
      );
    }

    dispatch({ type: 'setPerPageDropdown' });
    dispatch({ type: 'setSortByDropdown', delete: 'close' });
  };

  const debouncedSetSearchParams = useMemo(
    () =>
      debounce(newParams => {
        setSearchParams(newParams);
      }, 500),
    [setSearchParams],
  );

  const handleQueryInput = (p: string) => {
    setQuery(p);

    const newParams = getSearchWith(searchParams, {
      query: p ? p : null,
      paginPage: !searchParams.get('query') ? '1' : null,
    });

    debouncedSetSearchParams(newParams);

    dispatch({ type: 'setSortByDropdown', delete: 'close' });
    dispatch({ type: 'setPerPageDropdown', delete: 'close' });
  };

  const prevPage = () => {
    if (+paginPage > 1) {
      setSearchParams(
        getSearchWith(searchParams, {
          paginPage: (+paginPage - 1).toString(),
        }),
      );
    }
  };

  const nextPage = () => {
    if (+paginPage < paginPages.length) {
      setSearchParams(
        getSearchWith(searchParams, {
          paginPage: (+paginPage + 1).toString(),
        }),
      );
    }
  };

  return (
    <div className="Catalog">
      <Path pathname={pathname} itemPhone={itemDevice!} />

      <h1 className={cn('Catalog__title', { dark: darkThem })}>
        {titleCatalog}
      </h1>

      <p className="Catalog__count">{`${devices.length} models`}</p>

      {!nonCatalog && (
        <div className="Catalog__filters">
          <div className="Catalog__filters__center">
            <div className="Catalog__filters__sort-by">
              <p className="Catalog__filters__title">Sort by</p>
              <div
                onClick={() => handleSortLink()}
                className={cn(
                  'Catalog__filters__dropdown Catalog__filters__dropdown__sort-by',
                  { 'is-active': sortByDropdown, dark: darkThem },
                )}
              >
                {!searchParams.get('sort')
                  ? 'Select'
                  : searchParams.get('sort')}
              </div>

              {sortByDropdown && (
                <div
                  className={cn(
                    'Catalog__filters__dropdown__dropdown-is-active',
                    { dark: darkThem },
                  )}
                >
                  <a
                    onClick={() => handleSortLink(ParamsSortBy.one)}
                    className={cn(
                      'Catalog__filters__dropdown__dropdown-is-active__link',
                      {
                        'is-active':
                          searchParams.get('sort') === ParamsSortBy.one,
                        dark: darkThem,
                      },
                    )}
                  >
                    Newest
                  </a>

                  <a
                    onClick={() => handleSortLink(ParamsSortBy.two)}
                    className={cn(
                      'Catalog__filters__dropdown__dropdown-is-active__link',
                      {
                        'is-active':
                          searchParams.get('sort') === ParamsSortBy.two,
                        dark: darkThem,
                      },
                    )}
                  >
                    Alphabetically
                  </a>

                  <a
                    onClick={() => handleSortLink(ParamsSortBy.three)}
                    className={cn(
                      'Catalog__filters__dropdown__dropdown-is-active__link',
                      {
                        'is-active':
                          searchParams.get('sort') === ParamsSortBy.three,
                        dark: darkThem,
                      },
                    )}
                  >
                    Cheapest
                  </a>
                </div>
              )}
            </div>

            <div className="Catalog__filters__items-on-page">
              <p className="Catalog__filters__title">Items on page</p>
              <div
                onClick={() => handlePerPageLink()}
                className={cn(
                  'Catalog__filters__dropdown Catalog__filters__dropdown--per-page',
                  { 'is-active': perPageDropdown, dark: darkThem },
                )}
              >
                {searchParams.get('perPage')
                  ? searchParams.get('perPage')
                  : 'Select'}
              </div>
              {perPageDropdown && (
                <div
                  className={cn(
                    'Catalog__filters__dropdown__dropdown-is-active',
                    { dark: darkThem },
                  )}
                >
                  <a
                    onClick={() => handlePerPageLink('4')}
                    className={cn(
                      'Catalog__filters__dropdown__dropdown-is-active__link',
                      { 'is-active': perPage === '4', dark: darkThem },
                    )}
                  >
                    4
                  </a>
                  <a
                    onClick={() => handlePerPageLink('8')}
                    className={cn(
                      'Catalog__filters__dropdown__dropdown-is-active__link',
                      { 'is-active': perPage === '8', dark: darkThem },
                    )}
                  >
                    8
                  </a>
                  <a
                    onClick={() => handlePerPageLink('16')}
                    className={cn(
                      'Catalog__filters__dropdown__dropdown-is-active__link',
                      { 'is-active': perPage === '16', dark: darkThem },
                    )}
                  >
                    16
                  </a>
                  <a
                    onClick={() => handlePerPageLink('all')}
                    className={cn(
                      'Catalog__filters__dropdown__dropdown-is-active__link',
                      { 'is-active': perPage === 'all', dark: darkThem },
                    )}
                  >
                    all
                  </a>
                </div>
              )}
            </div>

            <div className="Catalog__filters__query">
              <p className="Catalog__filters__title">Search</p>
              <input
                value={query}
                onChange={event => handleQueryInput(event.target.value)}
                className={cn(
                  'Catalog__filters__dropdown Catalog__filters__dropdown--search',
                  { dark: darkThem },
                )}
              />
            </div>
          </div>
        </div>
      )}

      {renderDevices.length ? (
        <div className="Catalog__items">
          {favorites.map(d => (
            <BrandItem discount={true} device={d} key={d.id} />
          ))}
        </div>
      ) : (
        <>
          {!nonCatalog ? (
            <div className="Catalog__no-items">
              <img
                className="Catalog__items__empty-img Catalog__items__empty-img--not-found-product"
                src="https://raw.githubusercontent.com/olehmarushchak/react_phone-catalog/develop/src/assets/img/product-not-found.png"
                alt="empty"
              />
            </div>
          ) : (
            <div className="Catalog__no-items Catalog__no-items--nonCatalog">
              <img
                className="Catalog__items__empty-img"
                src="https://raw.githubusercontent.com/olehmarushchak/react_phone-catalog/develop/src/assets/img/cart-is-empty.png"
                alt="empty"
              />
            </div>
          )}
        </>
      )}

      {perPage !== 'all' && !nonCatalog && (
        <div className="Catalog__pagin">
          <a>
            <button
              onClick={prevPage}
              className={cn(
                'Catalog__pagin__button Catalog__pagin__button--prev',
                { dark: darkThem },
              )}
            />
          </a>

          <div className="Catalog__pagin__pages">
            <div className="Catalog__pagin__pages__center">
              <div className="Catalog__pagin__pages__center--turn-on-center">
                {(paginPages ?? []).map(d => (
                  <a key={d}>
                    <button
                      onClick={() => {
                        setSearchParams(
                          getSearchWith(searchParams, { paginPage: `${d}` }),
                        );
                      }}
                      key={d}
                      className={cn('Catalog__pagin__button', {
                        'is-active': paginPage === d.toString(),
                        dark: darkThem,
                      })}
                    >
                      {d}
                    </button>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a>
            <button
              onClick={nextPage}
              className={cn(
                'Catalog__pagin__button Catalog__pagin__button--next',
                { dark: darkThem },
              )}
            />
          </a>
        </div>
      )}
    </div>
  );
};
