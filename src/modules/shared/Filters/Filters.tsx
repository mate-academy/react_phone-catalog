import { useCallback, useEffect, useRef, useState } from 'react';
import './Filters.scss';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/GetSearchWith';
import { URLSearchParamsInit } from 'react-router-dom';

type Props = {
  params: URLSearchParams;
  setSearchParams: (params: URLSearchParamsInit) => void;
  order: string;
  length: string;
};

export const Filters: React.FC<Props> = ({
  params,
  length,
  order,
  setSearchParams,
}) => {
  const [items, setItems] = useState(false);
  const [sort, setSort] = useState(false);

  const handleClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isClick =
      target.classList.contains('filters__option') ||
      target.classList.contains('filters__options') ||
      target.classList.contains('filters__triggle');

    if (!isClick) {
      setSort(false);
      setItems(false);
    }
  }, []);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    if (sort || items) {
      document.addEventListener('click', event => handleClick(event));
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [sort, items, handleClick]);

  const handleSearchParamOrder = (value: string) => {
    setSearchParams(
      getSearchWith(params, {
        order: value,
        page: null,
      }),
    );

    setSort(false);
  };

  const handleSearchParamLength = (value: string) => {
    setSearchParams(
      getSearchWith(params, {
        length: value,
        page: null,
      }),
    );

    setItems(false);
  };

  return (
    <div className="filters">
      <div className="filters__fields">
        <div className="filters__dropdown">
          <h4 className="filters__label">Sort by</h4>
          <button
            className={classNames('filters__triggle', {
              'filters__triggle--active': sort,
            })}
            onClick={() => {
              setSort(!sort);
              setItems(false);
            }}
          >
            {order}
          </button>
          {sort && (
            <ul className="filters__options">
              <li
                className="filters__option"
                onClick={() => handleSearchParamOrder('Newest')}
              >
                Newest
              </li>
              <li
                className="filters__option"
                onClick={() => handleSearchParamOrder('Alphabeticaly')}
              >
                Alphabeticaly
              </li>
              <li
                className="filters__option"
                onClick={() => handleSearchParamOrder('Cheapest')}
              >
                Cheapest
              </li>
            </ul>
          )}
        </div>
        <div className="filters__dropdown">
          <h4 className="filters__label">Items on page</h4>
          <button
            className={classNames('filters__triggle', {
              'filters__triggle--active': items,
            })}
            onClick={() => {
              setItems(!items);
              setSort(false);
            }}
          >
            {length}
          </button>
          {items && (
            <ul className="filters__options">
              <li
                className="filters__option"
                onClick={() => handleSearchParamLength('All')}
              >
                All
              </li>
              <li
                className="filters__option"
                onClick={() => handleSearchParamLength('4')}
              >
                4
              </li>
              <li
                className="filters__option"
                onClick={() => handleSearchParamLength('8')}
              >
                8
              </li>
              <li
                className="filters__option"
                onClick={() => handleSearchParamLength('16')}
              >
                16
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
