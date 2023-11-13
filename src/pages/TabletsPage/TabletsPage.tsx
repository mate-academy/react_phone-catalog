import React, { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { NoResults } from '../../components/NoResults/NoResults';
import { useProducts } from '../../context/AppContext';
import { getTablets } from '../../helpers/products';
import { Errors } from '../../types/Errors';
import { Product } from '../../types/Product';
import { SORT_OPTIONS, ITEMS_PER_PAGE } from '../../constants/constants';
import { Dropdown } from '../../types/Dropdown';
import { Sort } from '../../types/Sort';
import { NoSearchResults } from '../../components/NoSearchResults';
import { ProductsList } from '../../components/ProductsList';
import { Pagination } from '../../components/Pagination';
import { getSearchWith } from '../../helpers/getSearchWith';

export const TabletsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { tabletsCount, setErrorMessage, removeError } = useProducts();

  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<Dropdown>(null);

  const page = +(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage') || 8;
  const sortBy = searchParams.get('sort') || 'age';
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setIsLoading(true);

    getTablets()
      .then(setTablets)
      .catch(() => {
        setErrorMessage(Errors.loadingTablets);
        removeError();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setErrorMessage, removeError]);

  const getVisibleTablets = useCallback(() => {
    let currentTablets = [...tablets];

    switch (sortBy) {
      case SORT_OPTIONS.Alphabetically:
        currentTablets = currentTablets.sort((phone1, phone2) => {
          return phone1.name.localeCompare(phone2.name);
        });
        break;

      case SORT_OPTIONS.Cheapest:
        currentTablets = currentTablets.sort((phone1, phone2) => {
          return phone1.price - phone2.price;
        });
        break;

      case SORT_OPTIONS.Newest:
        currentTablets = currentTablets
          .sort((phone1, phone2) => phone2.year - phone1.year)
          .sort((item1, item2) => item2.price - item1.price);
        break;

      default:
        return currentTablets;
    }

    if (query) {
      currentTablets = currentTablets.filter(phone => {
        return phone.name.toLowerCase()
          .includes(query.toLowerCase());
      });
    }

    return currentTablets;
  }, [tablets, query, sortBy]);

  const visibleTablets = getVisibleTablets();
  const numberOfPages = Math.ceil(visibleTablets.length / +perPage) || 1;

  const firstItem = (page - 1) * +perPage;
  const lastItem = page * +perPage < visibleTablets.length
    ? page * +perPage
    : visibleTablets.length;

  const handleDropdownClick = useCallback((value: Dropdown) => {
    setActiveDropdown(value === activeDropdown
      ? null
      : value);
  }, [activeDropdown]);

  const handleBlur = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const getSelectedSort = useCallback(() => {
    const currentSort = searchParams.get('sort');
    const selectedSort = Object.keys(SORT_OPTIONS).find(option => {
      return SORT_OPTIONS[option as keyof Sort] === currentSort;
    });

    return selectedSort || 'Newest';
  }, [searchParams]);

  return (
    <div className="CategoryPage">
      <div className="container">
        <div className="CategoryPage__content">
          <Breadcrumbs page={['Tablets']} />

          <div className="CategoryPage__main-info">
            <h1 className="CategoryPage__title">
              Tablets
            </h1>
            <span className="CategoryPage__models-count">
              {query ? (
                `${visibleTablets.length} result${visibleTablets.length === 1 ? '' : 's'}`
              ) : (
                `${tabletsCount}`
              )}
            </span>
          </div>

          {isLoading && (<Loader />)}

          {!tablets.length && !isLoading && (
            <NoResults category="Tablets" />
          )}

          {!visibleTablets.length && !isLoading && !!query && (
            <NoSearchResults />
          )}

          {!!visibleTablets.length && (
            <div className="CategoryPage__dropdowns">
              <div className="Dropdown">
                <p className="Dropdown__title">
                  Sort by
                </p>

                <div className="Dropdown__content">
                  <button
                    type="button"
                    className="button button--dropdown"
                    onClick={() => handleDropdownClick('sort')}
                    onBlur={handleBlur}
                  >
                    <p className="Dropdown__text">
                      {getSelectedSort()}
                    </p>
                    <div className={classNames('Dropdown__icon', {
                      'Dropdown__icon--active': activeDropdown === 'sort',
                    })}
                    />
                  </button>

                  <ul
                    className={classNames('Dropdown__list', {
                      'Dropdown__list--opened': activeDropdown === 'sort',
                    })}
                  >
                    {Object.entries(SORT_OPTIONS).map(([key, value]) => (
                      <div key={value} className="Dropdown__item">
                        <Link
                          to={{
                            search: getSearchWith(
                              searchParams, {
                                sort: value,
                                page: '1',
                              },
                            ).toString(),
                          }}
                          className="Dropdown__link"
                        >
                          {key}
                        </Link>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="Dropdown">
                <p className="Dropdown__title">
                  Items on page
                </p>

                <div className="Dropdown__content">
                  <button
                    type="button"
                    className="button button--dropdown"
                    onClick={() => handleDropdownClick('perPage')}
                    onBlur={handleBlur}
                  >
                    <p className="button--dropdown-text">
                      {perPage.toString()}
                    </p>
                    <div className={classNames('Dropdown__icon', {
                      'Dropdown__icon--active': activeDropdown === 'perPage',
                    })}
                    />
                  </button>

                  <ul
                    className={classNames('Dropdown__list', {
                      'Dropdown__list--opened': activeDropdown === 'perPage',
                    })}
                  >
                    {ITEMS_PER_PAGE.map((option) => (
                      <div key={option} className="Dropdown__item">
                        <Link
                          to={{
                            search: getSearchWith(
                              searchParams, {
                                perPage: option,
                                page: '1',
                              },
                            ).toString(),
                          }}
                          className="Dropdown__link"
                        >
                          {option}
                        </Link>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {!isLoading && !!visibleTablets.length && (
            <ProductsList
              products={visibleTablets.slice(firstItem, lastItem)}
            />
          )}

          {numberOfPages > 1 && perPage !== 'All' && (
            <Pagination pages={numberOfPages} />
          )}
        </div>
      </div>
    </div>
  );
};
