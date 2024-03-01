import React, { Dispatch, SetStateAction, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { v4 as getId } from 'uuid';

import './Dropdown.scss';
import { SortType } from '../../types/SortType';
import { SortParamsType } from '../../types/SortParamsType';
import { getSearchWith } from '../../utils/getSearchWith';
import { Params } from '../../types/Params';

type Props = {
  sortParams?: SortParamsType[],
  perPageParams?: number[],
  title: string,
  isItemsPerPage?: boolean,
  setCurrentPage?: Dispatch<SetStateAction<number>>,
  isSmall?: boolean,
};

const optionHeight = 32;

export const Dropdown: React.FC<Props> = ({
  sortParams = [],
  perPageParams = [],
  title,
  isItemsPerPage,
  setCurrentPage = () => {},
  isSmall,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortType = searchParams.get('sortType') || SortType.Newest;
  const itemsPerPage = +(searchParams.get('perPage') || 32);

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const setSearchWith = (params: Params) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleSortTypeChange = (type: SortType) => {
    setIsDropdownActive(false);

    setSearchWith({ sortType: type });
  };

  const handlePerPageChange = (perPage: number) => {
    setIsDropdownActive(false);

    setSearchWith({ perPage });
    setCurrentPage(1);
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
