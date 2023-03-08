import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Dropdowns.scss';
import { getSearchWith } from '../../helpers/getSearchWith';

type Props = {
  total: number,
};

export const Dropdowns: React.FC<Props> = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortValue, setSortValue] = useState('Newest');
  const [pageValue, setPageValue] = useState('4');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPages, setIsOpenPages] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const togglePages = () => {
    setIsOpenPages(!isOpenPages);
  };

  const onSelectSortOption = (option: string, value: string) => {
    setSearchParams(
      getSearchWith(searchParams, { sort: option }),
    );

    setSortValue(value);
    toggle();
  };

  const onSelectPerPage = (option: string) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        {
          perPage: option !== 'all'
            ? option
            : `${total}`,
          page: '1',
        },
      ),
    );

    setPageValue(option);
    togglePages();
  };

  return (
    <div className="dropdowns">
      <div className="dropdowns__content">
        <div>
          <p className="dropdowns__text">Sort by</p>

          <button
            type="button"
            onClick={toggle}
            className="dropdowns__button"
          >
            {sortValue}
          </button>
          {isOpen && (
            <ul className="dropdowns__list">
              <li
                className="dropdowns__item"
                onClick={() => onSelectSortOption('age', 'Newest')}
                aria-hidden="true"
              >
                Newest
              </li>
              <li
                className="dropdowns__item"
                onClick={() => onSelectSortOption('name', 'Alphabetically')}
                aria-hidden="true"
              >
                Alphabetically
              </li>
              <li
                className="dropdowns__item"
                onClick={() => onSelectSortOption('price', 'Cheapest')}
                aria-hidden="true"
              >
                Cheapest
              </li>
            </ul>
          )}
        </div>

        <div>
          <p className="dropdowns__text">Items on page</p>

          <button
            type="button"
            onClick={togglePages}
            className="dropdowns__button dropdowns__button--small"
          >
            {pageValue}
          </button>
          {isOpenPages && (
            <ul className="dropdowns__list dropdowns__list--small">
              {['4', '8', '16', 'all'].map(option => (
                <li
                  key={option}
                  className="dropdowns__item"
                  onClick={() => onSelectPerPage(option)}
                  aria-hidden="true"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
