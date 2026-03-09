import classNames from 'classnames';
import './Dropdown.scss';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../components/context/ThemeContext';

type Props = {
  sort: string;
  updateSort: (value: string) => void;
  perPage: number;
  updatePerPage: (value: number) => void;
};

export const Dropdown: React.FC<Props> = ({
  sort,
  updateSort,
  perPage,
  updatePerPage,
}) => {
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenPerPage, setIsOpenPerPage] = useState(false);

  const { theme } = useTheme();

  const sortRef = useRef<HTMLDivElement>(null);
  const perPageRef = useRef<HTMLDivElement>(null);

  const sortToLabel = (value: string) => {
    switch (value) {
      case 'name':
        return 'Alphabetical';
      case 'price':
        return 'Cheapest';
      default:
        return 'Newest';
    }
  };

  const labelToSort = (label: string) => {
    switch (label) {
      case 'Alphabetical':
        return 'name';
      case 'Cheapest':
        return 'price';
      default:
        return 'age';
    }
  };

  const [selectedSort, setSelectedSort] = useState(sortToLabel(sort));
  const [selectedPerPage, setSelectedPerPage] = useState(perPage.toString());

  const sortOptions = ['Newest', 'Alphabetical', 'Cheapest'];
  const perPageOptions = ['8', '16', '32'];

  const handleSortSelect = (label: string) => {
    setSelectedSort(label);
    setIsOpenSort(false);
    updateSort(labelToSort(label));
  };

  const handlePerPageSelect = (value: string) => {
    setSelectedPerPage(value);
    setIsOpenPerPage(false);
    updatePerPage(+value);
  };

  useEffect(() => setSelectedSort(sortToLabel(sort)), [sort]);
  useEffect(() => setSelectedPerPage(perPage.toString()), [perPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsOpenSort(false);
      }

      if (
        perPageRef.current &&
        !perPageRef.current.contains(event.target as Node)
      ) {
        setIsOpenPerPage(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown">
      {/* Сортування */}
      <div className="dropdown__box dropdown__box--sort">
        <p className="dropdown__label">Sort by</p>
        <div className="dropdown__select" ref={sortRef}>
          <div
            className="dropdown__trigger"
            onClick={() => setIsOpenSort(prev => !prev)}
          >
            <span className="dropdown__trigger--text">{selectedSort}</span>
            <img
              src={
                isOpenSort
                  ? theme === 'light'
                    ? './img/icons/Arrow-Up_icon.svg'
                    : './img/icons/Arrow-Up_dark.svg'
                  : theme === 'light'
                    ? './img/icons/Arrow-Down_icon.svg'
                    : './img/icons/Arrow-Down_icon.svg'
              }
              alt="chevron"
              className="icon dropdown__icon"
            />
          </div>
          <ul
            className={classNames('dropdown__list', {
              'dropdown__list--active': isOpenSort,
            })}
          >
            {sortOptions.map(option => (
              <li
                key={option}
                onClick={() => handleSortSelect(option)}
                className={classNames('dropdown__item', {
                  'dropdown__item--selected': selectedSort === option,
                })}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Кількість на сторінці */}
      <div className="dropdown__box dropdown__box--perpage">
        <p className="dropdown__label">Items on page</p>
        <div className="dropdown__select" ref={perPageRef}>
          <div
            className="dropdown__trigger"
            onClick={() => setIsOpenPerPage(prev => !prev)}
          >
            <span className="dropdown__trigger--text">{selectedPerPage}</span>
            <img
              src={
                isOpenPerPage
                  ? theme === 'light'
                    ? './img/icons/Arrow-Up_icon.svg'
                    : './img/icons/Arrow-Up_dark.svg'
                  : theme === 'light'
                    ? './img/icons/Arrow-Down_icon.svg'
                    : './img/icons/Arrow-Down_icon.svg'
              }
              alt="chevron"
              className="icon dropdown__icon"
            />
          </div>
          <ul
            className={classNames('dropdown__list', {
              'dropdown__list--active': isOpenPerPage,
            })}
          >
            {perPageOptions.map(value => (
              <li
                key={value}
                onClick={() => handlePerPageSelect(value)}
                className={classNames('dropdown__item', {
                  'dropdown__item--selected': selectedPerPage === value,
                })}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
