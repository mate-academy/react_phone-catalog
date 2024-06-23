import './Filters.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FilterItems } from '../../types/FilterItems';

type Props = {
  setFilterItem: React.Dispatch<React.SetStateAction<FilterItems>>;
  filterItem: {
    filter: string;
    count: string;
  };
};

export const Filters: React.FC<Props> = ({ setFilterItem, filterItem }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortTitle, setSortTitle] = useState('Newest');
  const [activeMenus, setActiveMenus] = useState({
    filter: false,
    sort: false,
  });

  const handleSortChange = (event: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', event);

    setSearchParams(params);

    setFilterItem({ ...filterItem, filter: event });

    setActiveMenus(currentTarget => ({
      ...currentTarget,
      filter: !currentTarget.filter,
    }));
  };

  const handleCountPhones = (event: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    params.set('perPage', event);

    setSearchParams(params);

    setFilterItem({ ...filterItem, count: event });

    setActiveMenus(currentTarget => ({
      ...currentTarget,
      sort: !currentTarget.sort,
    }));
  };

  const handleMenu = (value: string) => {
    switch (value) {
      case 'filter': {
        setActiveMenus(currentTarget => ({
          ...currentTarget,
          filter: !currentTarget.filter,
        }));
        break;
      }

      case 'sort': {
        setActiveMenus(currentTarget => ({
          ...currentTarget,
          sort: !currentTarget.sort,
        }));
        break;
      }

      default:
        break;
    }
  };

  useEffect(() => {
    switch (filterItem.filter) {
      case 'name': {
        setSortTitle('Alphabetically');
        break;
      }

      case 'price': {
        setSortTitle('Cheapest');
        break;
      }

      default:
        setSortTitle('Newest');
        break;
    }
  }, [filterItem]);

  return (
    <div className="filters">
      <div className="filters__block">
        <p className="filters__description">Sort by</p>

        <div className="filters__dropdown">
          <div className="filters__trigger">
            <button
              className="filters__button filters__button--first"
              type="button"
              onClick={() => handleMenu('filter')}
            >
              <span>{sortTitle}</span>

              <div
                className={classNames('icon', {
                  'icon--arrow-down--disabled': !activeMenus.filter,
                  'icon--arrow-up--disabled': activeMenus.filter,
                })}
              />
            </button>
          </div>

          <div
            className={classNames('filters__menu', {
              'filters__menu--active': activeMenus.filter,
            })}
          >
            <div className="filters__content">
              <button
                type="button"
                className="filters__item"
                onClick={() => handleSortChange('age')}
              >
                Newest
              </button>

              <button
                type="button"
                className="filters__item"
                onClick={() => handleSortChange('name')}
              >
                Alphabetically
              </button>

              <button
                type="button"
                className="filters__item"
                onClick={() => handleSortChange('price')}
              >
                Cheapest
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="filters__block">
        <p className="filters__description">Items on page</p>

        <div className="filters__dropdown">
          <div className="filters__trigger">
            <button
              className="filters__button filters__button--second"
              type="button"
              onClick={() => handleMenu('sort')}
            >
              <span>{filterItem.count}</span>

              <div
                className={classNames('icon', {
                  'icon--arrow-down--disabled': !activeMenus.sort,
                  'icon--arrow-up--disabled': activeMenus.sort,
                })}
              />
            </button>
          </div>

          <div
            className={classNames('filters__menu', {
              'filters__menu--active': activeMenus.sort,
            })}
          >
            <div className="filters__content">
              <button
                type="button"
                className="filters__item"
                onClick={() => handleCountPhones('all')}
              >
                all
              </button>

              <button
                type="button"
                className="filters__item"
                onClick={() => handleCountPhones('4')}
              >
                4
              </button>

              <button
                type="button"
                className="filters__item"
                onClick={() => handleCountPhones('8')}
              >
                8
              </button>

              <button
                type="button"
                className="filters__item"
                onClick={() => handleCountPhones('16')}
              >
                16
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
