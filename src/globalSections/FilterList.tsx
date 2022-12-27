import classNames from 'classnames';
import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from 'src/types/Product';
import { SortBy } from 'src/types/SortBy';
import { lower } from 'src/utils/shortHands';
import { getSearchWith } from 'src/utils/helpers/searchHelper';

type Props = {
  dropDownContent: string[],
  setIsDropdown: React.Dispatch<React.SetStateAction<boolean>>,
  isSort: boolean,
  fromNameToProps: SortBy,
  typeProducts: Product[],
};

export const FilterList: FC<Props> = ({
  dropDownContent,
  setIsDropdown,
  isSort,
  fromNameToProps,
  typeProducts,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnClick = (value: string) => {
    if (isSort) {
      setSearchParams(
        getSearchWith(searchParams, { sort: lower(value) || null }),
      );
    } else {
      setSearchParams(
        getSearchWith(
          searchParams,
          {
            perPage: lower(value) || null,
            page: '1',
          },
        ),
      );
    }

    setIsDropdown(false);
  };

  const isDropDownItemDisabled = (el: string) => {
    if (!isSort && lower(el) !== 'all') {
      return +el > typeProducts.length;
    }

    return false;
  };

  return (
    <>
      <ul className="dropdown-section__list">
        {dropDownContent.map(el => {
          return (
            <li
              key={el}
              aria-hidden
              className={classNames(
                'dropdown-section__item',
                { disabled: isDropDownItemDisabled(el) },
              )}
              onClick={() => {
                if (isSort) {
                  handleOnClick((fromNameToProps[el]));
                } else {
                  handleOnClick(lower(el));
                }
              }}
            >
              {el}
            </li>
          );
        })}
      </ul>

    </>
  );
};
