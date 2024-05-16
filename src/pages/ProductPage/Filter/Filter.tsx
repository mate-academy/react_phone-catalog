import { useState } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Sort } from '../../../types/Sort';
import './Filter.scss';
import { FilterOption } from '../../../types/FilterOption';

export enum Pages {
  'four' = 4,
  'eight' = 8,
  'sixteen' = 16,
  'all' = 'all',
}

// type FilterSetter = SetStateAction<Sort> & SetStateAction<Pages>;

type Props = {
  option: FilterOption;
  title: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  // sort?: Sort;
  // setSort?: React.Dispatch<React.SetStateAction<Sort>>;
  // itemsOnPage?: Pages;
  // setItemsOnPage?: React.Dispatch<React.SetStateAction<Pages>>;
};

export const Filter: React.FC<Props> = ({
  option,
  title,
  searchParams,
  setSearchParams,
  // sort,
  // setSort,
  // itemsOnPage,
  // setItemsOnPage,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // const filter = title Pages ? (sort as Sort) : (itemsOnPage as Pages);
  // const setFilter = setSort ? setSort : setItemsOnPage;

  const filterOptions =
    title === 'Sort by'
      ? [Sort.Newest, Sort.Alphabetically, Sort.Cheapest]
      : [Pages.all, Pages.four, Pages.eight, Pages.sixteen];

  const dropdownButtonText: string =
    option === FilterOption.Sort
      ? (searchParams.get(FilterOption.Sort) as string)
      : (searchParams.get(FilterOption.Items) as string);

  return (
    <div className="filter">
      <p className="filter__name">{title}</p>

      <button
        className="filter__filter"
        onClick={() => {
          setIsDropdownVisible(current => !current);
        }}
        onBlur={() => setIsDropdownVisible(false)}
      >
        {/* {filter} */}
        {dropdownButtonText}
      </button>

      {isDropdownVisible && (
        <div className="dropdown filter__dropdown">
          {filterOptions.map(filterOption => (
            <button
              key={filterOption}
              className={cn('dropdown__option', {
                'dropdown__option--active':
                  searchParams.get(option) === filterOption,
              })}
              onMouseDown={() => {
                // eslint-disable-next-line no-console
                console.log('set', option, 'to: ', filterOption.toString());

                searchParams.set(option, filterOption.toString());
                setSearchParams(searchParams);
              }}
              value={filterOption}
            >
              {filterOption}
            </button>
          ))}
          {/* <button
              className={cn('dropdown__option', {
                'dropdown__option--active': filter === filterOptions[0],
              })}
              onMouseDown={() => {
                setFilter(filterOptions[0] as FilterSetter);
              }}
              value={filterOptions[0]}
            >
              {filterOptions[0]}
            </button>
            <button
              className={cn('dropdown__option', {
                'dropdown__option--active': filter === filterOptions[1],
              })}
              onMouseDown={() => setFilter(filterOptions[1] as FilterSetter)}
              value={filterOptions[1]}
            >
              {filterOptions[1]}
            </button>
            <button
              className={cn('dropdown__option', {
                'dropdown__option--active': filter === filterOptions[2],
              })}
              onMouseDown={() => setFilter(filterOptions[2] as FilterSetter)}
              value={filterOptions[2]}
            >
              {filterOptions[2]}
            </button> */}
        </div>
      )}
    </div>
  );
};
