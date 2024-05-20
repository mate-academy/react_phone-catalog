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

type Props = {
  option: FilterOption;
  title: string;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export const Filter: React.FC<Props> = ({
  option,
  title,
  searchParams,
  setSearchParams,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const filterOptions =
    option === FilterOption.Sort
      ? [Sort.Newest, Sort.Alphabetically, Sort.Cheapest]
      : [Pages.all, Pages.four, Pages.eight, Pages.sixteen];

  const initialDropdownButtonText: string =
    option === FilterOption.Sort ? 'newest' : 'all';

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
        {dropdownButtonText ? dropdownButtonText : initialDropdownButtonText}
      </button>

      {isDropdownVisible && (
        <div className="dropdown filter__dropdown">
          {filterOptions.map(filterOption => (
            <button
              key={filterOption}
              className={cn('dropdown__option', {
                'dropdown__option--active': searchParams.get(option.toString())
                  ? searchParams.get(option.toString()) ===
                    filterOption.toString()
                  : initialDropdownButtonText === filterOption.toString(),
              })}
              onMouseDown={() => {
                searchParams.set(option, filterOption.toString());
                setSearchParams(searchParams);
              }}
              value={filterOption}
            >
              {filterOption}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
