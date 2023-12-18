/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import './FilterPanel.scss';
import {
  SearchParams,
  getSearchWith,
} from '../../helpers/getFunctions/searchHelper';
import { getUniqueId } from '../../helpers/getFunctions/getUniqueld';

const optionsSort = ['Newest', 'Name', 'Cheapest'];
const optionsItemsNumber = ['16', '8', '4', 'All'];

export const FilterPanel: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const itemsNumber = searchParams.get('itemsOnPage') || '16';

  const [sortLabel, setSortLabel] = useState('Newest');

  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenItems, setIsOpenItems] = useState(false);

  const handleBtnSort = () => {
    setIsOpenSort(!isOpenSort);
  };

  const handleSelectSort = (option: string) => {
    const params: {
      sort?: string;
      page?: string;
    } = {};

    if (option === 'Cheapest') {
      params.sort = 'price';
    } else if (option === 'Name') {
      params.sort = 'name';
    } else {
      params.sort = 'year';
    }

    params.page = '1';

    setSearchWith(params);
    setSortLabel(option);
    setIsOpenSort(false);
  };

  const handleBtnItemsNumber = () => {
    setIsOpenItems(!isOpenItems);
  };

  const handleSelectItemsNumber = (option: string) => {
    setSearchWith({
      itemsOnPage: option,
      page: '1',
    });

    setIsOpenItems(false);
  };

  return (
    <div className="search-panel">
      <div className="search-panel__btn-wrapper">
        <p className="search-panel__btn-label">
          Sort by
        </p>
        <button
          onMouseDown={handleBtnSort}
          onBlur={() => setIsOpenSort(false)}
          className="search-panel__btn button"
        >
          <div
            className="
              search-panel__btn-value
              search-panel__btn-value--sort
            "
          >
            {sortLabel}
          </div>

          <div className={classNames('icon', {
            'icon__arrow-secondary': !isOpenSort,
            'icon__arrow-primary icon__arrow-primary--top': isOpenSort,
          })}
          />
        </button>

        {isOpenSort && (
          <ul className="search-panel__dropdown-menu">
            {optionsSort.map((option) => (
              <li
                key={getUniqueId()}
                className="search-panel__dropdown-menu-item"
              >
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectSort(option);
                  }}
                  className="search-panel__btn-option"
                >
                  <div className={classNames(
                    'search-panel__option-value',
                    {
                      'search-panel__option-value--selected':
                        option === sortLabel,
                    },
                  )}
                  >
                    {option}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="search-panel__btn-wrapper">
        <p className="search-panel__btn-label">
          Items on page
        </p>
        <button
          onMouseDown={handleBtnItemsNumber}
          onBlur={() => setIsOpenItems(false)}
          className="search-panel__btn button"
        >
          <div
            className="
      search-panel__btn-value
      search-panel__btn-value--itemsNumber
    "
          >
            {itemsNumber}
          </div>

          <div className={classNames('icon', {
            'icon__arrow-secondary': !isOpenItems,
            'icon__arrow-primary icon__arrow-primary--top': isOpenItems,
          })}
          />
        </button>

        {isOpenItems && (
          <ul className="search-panel__dropdown-menu">
            {optionsItemsNumber.map(option => (
              <li
                key={getUniqueId()}
                className="search-panel__dropdown-menu-item"
              >
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectItemsNumber(option);
                  }}
                  className="search-panel__btn-option"
                >
                  <div className={classNames(
                    'search-panel__option-value',
                    {
                      'search-panel__option-value--selected':
                        option === itemsNumber,
                    },
                  )}
                  >
                    {option}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
