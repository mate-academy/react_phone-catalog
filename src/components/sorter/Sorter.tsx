/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import cn from 'classnames';
import './Sorter.scss';
import React, { useCallback, useState } from 'react';

type Props = {
  sortBy: string;
  setSearchParams: (value: URLSearchParams) => void;
  searchParams: URLSearchParams;
  perPage: string;
};

const SORT_OPTIONS = ['Newest', 'Alphabetically', 'Cheapest'];
const ITEMS_PER_PAGE = ['4', '8', '16', 'all'];

export const Sorter: React.FC<Props> = React.memo(
  ({ sortBy, searchParams, setSearchParams, perPage }) => {
    const [isSortListVisible, setIsSortListVisible] = useState(false);
    const [isCountItemListVisible, setIsCountItemListVisible] = useState(false);

    const handleSortChange = useCallback(
      (newSort: string) => {
        const params = new URLSearchParams(searchParams);
        const sortValues: { [key: string]: string } = {
          Newest: 'age',
          Alphabetically: 'title',
          Cheapest: 'price',
        };
        const sortValue = sortValues[newSort] || '';

        if (sortValue) {
          params.set('sort', sortValue);
        } else {
          params.delete('sort');
        }

        setSearchParams(params);
      },
      [searchParams, setSearchParams],
    );

    const handlePerPageChange = useCallback(
      (newPerPage: string) => {
        const params = new URLSearchParams(searchParams);

        if (newPerPage === 'all') {
          params.delete('perPage');
        } else {
          params.set('perPage', newPerPage);
        }

        params.delete('page');
        setSearchParams(params);
      },
      [searchParams, setSearchParams],
    );

    return (
      <div className="sorter">
        <div className="sorter__sortBy">
          <p className="sorter__name">Sort by</p>
          <div
            className={cn('sorter__select', {
              'sorter__select--active': isSortListVisible,
            })}
          >
            <input
              value={sortBy}
              type="button"
              onChange={() => {}}
              onClick={() => setIsSortListVisible(prev => !prev)}
              onBlur={() => setTimeout(() => setIsSortListVisible(false), 200)}
              className={cn('sorter__left', {
                'sorter__left--focus': isSortListVisible,
              })}
            />
            {isSortListVisible && (
              <ul className="sorter__list">
                {SORT_OPTIONS.map(option => (
                  <li
                    key={option}
                    className="sorter__item"
                    onClick={() => handleSortChange(option)}
                    onKeyDown={e =>
                      e.key === 'Enter' && handleSortChange(option)
                    }
                    tabIndex={0}
                    role="button"
                    aria-pressed={sortBy === option}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="sorter__items">
          <p className="sorter__name">Items on page</p>
          <div
            className={cn('sorter__select', {
              'sorter__select--active': isCountItemListVisible,
            })}
          >
            <input
              value={perPage}
              type="button"
              onChange={() => {}}
              onClick={() => setIsCountItemListVisible(prev => !prev)}
              onBlur={() => {
                setTimeout(() => setIsCountItemListVisible(false), 200);
              }}
              className={cn('sorter__right', {
                'sorter__right--focus': isCountItemListVisible,
              })}
            />
            {isCountItemListVisible && (
              <ul className="sorter__list">
                {ITEMS_PER_PAGE.map(item => (
                  <li
                    key={item}
                    className="sorter__item"
                    onClick={() => handlePerPageChange(item)}
                    onKeyDown={e =>
                      e.key === 'Enter' && handlePerPageChange(item)
                    }
                    tabIndex={0}
                    role="button"
                    aria-pressed={perPage === item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  },
);
