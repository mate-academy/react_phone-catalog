/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';

import './CustomSelector.scss';

type Props = {
  optionFields: string[];
  type: string;
  selectedValue: string;
};

export const CustomSelector: React.FC<Props> = ({
  optionFields,
  type,
  selectedValue,
}) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [searchParams] = useSearchParams();
  let visibleValue = '';

  const filterOptionsValue: Record<string, string | null> = {
    All: null,
    Alphabetically: 'name',
    Newest: 'age',
    Cheapest: 'price',
  };

  if (type === 'sort') {
    switch (selectedValue) {
      case 'name':
        visibleValue = 'Alphabetically';
        break;
      case 'age':
        visibleValue = 'Newest';
        break;
      case 'price':
        visibleValue = 'Cheapest';
        break;
      default:
        visibleValue = 'All';
    }
  } else {
    visibleValue = selectedValue || 'All';
  }

  const paginationOptionsValue: Record<string, string | null> = {
    All: null,
    4: '4',
    8: '8',
    16: '16',
  };

  const handleOptionClick = () => {
    setIsDropdownOpened(false);
  };

  const handleDropdownClick = () => {
    if (isDropdownOpened) {
      setIsDropdownOpened(false);

      return;
    }

    setIsDropdownOpened(true);
  };

  const getRoute = (propType: string, option: string) => {
    if (propType === 'sort') {
      return {
        sort: filterOptionsValue[option],
        perPage: searchParams.get('perPage'),
        page: searchParams.get('page'),
      };
    }

    return {
      sort: searchParams.get('sort'),
      perPage: paginationOptionsValue[option],
      page: option === 'All' ? null : '1',
    };
  };

  return (
    <div
      className="custom-selector"
      onMouseLeave={() => setIsDropdownOpened(false)}
    >
      <button
        className="custom-selector__picker"
        type="button"
        onClick={handleDropdownClick}
      >
        <div className="custom-selector__picker--title">
          {visibleValue}
        </div>

        <div className="custom-selector__picker--arrow">
          <img src="img/icons/arrow-down.svg" alt="" />
        </div>

      </button>

      <ul
        className={classNames('custom-selector__list', {
          'custom-selector__list--is-hidden': !isDropdownOpened,
        })}
      >
        {optionFields.map(option => (
          <Link
            to={{
              search: getSearchWith(searchParams, getRoute(type, option)),
            }}
            key={option}
            className="custom-selector__item"
            onClick={() => handleOptionClick()}
          >
            {option}
          </Link>
        ))}
      </ul>
    </div>
  );
};
