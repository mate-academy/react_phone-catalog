import React, { Dispatch, SetStateAction, useState } from 'react';
import cn from 'classnames';
import { v4 as getId } from 'uuid';

import './Dropdown.scss';
import { SortType } from '../../types/SortType';
import { SortParamsType } from '../../types/SortParamsType';

type Props = {
  sortParams?: SortParamsType[],
  perPageParams?: number[],
  sortType?: SortType,
  setSortType?: Dispatch<SetStateAction<SortType>>,
  itemsPerPage?: number,
  setItemsPerPage?: Dispatch<SetStateAction<number>>
  title: string,
  isItemsPerPage?: boolean
  isSmall?: boolean,
};

const optionHeight = 32;

export const Dropdown: React.FC<Props> = ({
  sortParams = [],
  perPageParams = [],
  sortType = '',
  setSortType = () => { },
  itemsPerPage = 0,
  setItemsPerPage = () => { },
  title,
  isItemsPerPage,
  isSmall,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleSortTypeChange = (type: SortType) => {
    setSortType(type);
    setIsDropdownActive(false);
  };

  const handlePerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
    setIsDropdownActive(false);
  };

  return (
    <div
      className={cn(
        'dropdown',
        {
          'dropdown--small': isSmall,
        },
      )}
    >
      <p className="dropdown__label">
        {title}
      </p>

      <button
        type="button"
        className="dropdown__input"
        onClick={() => setIsDropdownActive(!isDropdownActive)}
      >
        <img
          className={cn(
            'dropdown__arrow',
            {
              'dropdown__arrow--active': isDropdownActive,
            },
          )}
          src="img/icons/arrow-down.svg"
          alt="Arrow down"
        />

        {isItemsPerPage ? itemsPerPage : sortType}
      </button>

      <div
        className={cn(
          'dropdown__select-area',
          {
            'dropdown__select-area--active': isDropdownActive,
          },
        )}
        style={{
          height: isDropdownActive
            ? `${(optionHeight * ((sortParams?.length || perPageParams?.length) || 0)) + 16}px`
            : 0,
        }}
      >
        {sortParams && sortParams.map(({ type, value }: SortParamsType) => (
          <option
            key={getId()}
            value={value}
            className={cn(
              'dropdown__option',
              {
                'dropdown__option--active': sortType === type,
              },
            )}
            onClick={() => handleSortTypeChange(type)}
          >
            {type}
          </option>
        ))}

        {perPageParams && perPageParams.map(perPage => (
          <option
            key={getId()}
            className={cn(
              'dropdown__option',
              {
                'dropdown__option--active': perPage === itemsPerPage,
              },
            )}
            onClick={() => handlePerPageChange(perPage)}
          >
            {perPage}
          </option>
        ))}
      </div>
    </div>
  );
};
