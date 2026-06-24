import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import s from './Dropdown.module.scss';

export const Dropdown = () => {
  const [isActive, setIsActive] = useState(false);
  const [isActivePerPage, setIsActivePerPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'newest';
  const perPage = searchParams.get('perpage') || 'all';

  const sortValue = {
    newest: 'Newest',
    price: 'Cheapest ',
    alphabet: 'Alphabetically',
  };

  const sortPerPage = [4, 8, 16, 'all'];

  function getSortTitle(key: keyof typeof sortValue): string {
    return sortValue[key];
  }

  function handleDropdownClick(sortStr: string) {
    const newSort = sortStr;

    const params = new URLSearchParams(searchParams);

    params.set('sort', newSort);

    if (!newSort) {
      params.delete('sort');
    }

    params.delete('page');
    setSearchParams(params);
  }

  function handlePerPageClick(perPageNum: string) {
    const newPerPage = perPageNum;

    const params = new URLSearchParams(searchParams);

    params.set('perpage', newPerPage);

    if (newPerPage === 'all') {
      params.delete('perpage');
      params.delete('page');
    }

    if (!newPerPage) {
      params.delete('perpage');
    }

    params.delete('page');
    setSearchParams(params);
  }

  return (
    <div className="is-flex mb-5">
      <div className="dropdown is-flex-direction-column mr-4">
        <p className={`is-size-7 has-text-weight-medium ${s.sort_title}`}>
          Sort by
        </p>
        <div
          className={classNames('dropdown-trigger', {
            'is-active': isActive,
          })}
        >
          <button
            className={`button ${s.dropdown_btn}`}
            aria-haspopup="true"
            aria-controls="dropdown-menu3"
            onBlur={() => setTimeout(() => setIsActive(false), 150)}
            onClick={() => {
              setIsActive(true);
            }}
          >
            <span className={`${s.dropdown_btn__text}`}>
              {getSortTitle(sort as keyof typeof sortValue)}
            </span>
            <span className="icon is-small">
              <FontAwesomeIcon icon={faAngleDown} aria-hidden="true" />
            </span>
          </button>
        </div>
        <div
          className={classNames('dropdown-menu', {
            'is-block': isActive,
          })}
          id="dropdown-menu3"
          role="menu"
        >
          <div className="dropdown-content">
            {Object.entries(sortValue).map(([key, value], idx) => (
              <Link
                to="#"
                key={idx}
                className="dropdown-item"
                onClick={e => {
                  e.preventDefault();
                  handleDropdownClick(key);
                  setIsActive(false);
                }}
              >
                {' '}
                {value}{' '}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="dropdown is-flex-direction-column">
        <p className={`is-size-7 has-text-weight-medium ${s.sort_title}`}>
          Items on page
        </p>
        <div
          className={classNames('dropdown-trigger', {
            'is-active': isActivePerPage,
          })}
        >
          <button
            className={`button ${s.dropdown_btn}`}
            aria-haspopup="true"
            aria-controls="dropdown-menu3"
            onBlur={() => setTimeout(() => setIsActivePerPage(false), 150)}
            onClick={() => setIsActivePerPage(true)}
          >
            <span className={`${s.dropdown_btn__text}`}>
              {perPage ? perPage : '8'}
            </span>
            <span className="icon is-small">
              <FontAwesomeIcon icon={faAngleDown} aria-hidden="true" />
            </span>
          </button>
        </div>
        <div
          className={classNames('dropdown-menu', {
            'is-block': isActivePerPage,
          })}
          id="dropdown-menu3"
          role="menu"
        >
          <div className="dropdown-content">
            {sortPerPage.map((p, idx) => (
              <Link
                to="#"
                key={idx}
                className="dropdown-item"
                onClick={e => {
                  e.preventDefault();
                  handlePerPageClick(p.toString());
                  setIsActivePerPage(false);
                }}
              >
                {p}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
