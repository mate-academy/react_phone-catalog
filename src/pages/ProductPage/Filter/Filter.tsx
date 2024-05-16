import { SetStateAction, useState } from 'react';
import { Sort } from '../../../types/Sort';
import './Filter.scss';
import cn from 'classnames';

export enum Pages {
  'four' = 4,
  'eight' = 8,
  'sixteen' = 16,
  'all' = 'all',
}

type FilterSetter = SetStateAction<Sort> & SetStateAction<Pages>;

type Props = {
  title: string;
  sort?: Sort;
  setSort?: React.Dispatch<React.SetStateAction<Sort>>;
  itemsOnPage?: Pages;
  setItemsOnPage?: React.Dispatch<React.SetStateAction<Pages>>;
};

export const Filter: React.FC<Props> = ({
  title,
  sort,
  setSort,
  itemsOnPage,
  setItemsOnPage,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const filter = sort ? (sort as Sort) : (itemsOnPage as Pages);
  const setFilter = setSort ? setSort : setItemsOnPage;

  const filterOptions =
    title === 'Sort by'
      ? [Sort.Newest, Sort.Alphabetically, Sort.Cheapest]
      : [Pages.all, Pages.four, Pages.eight, Pages.sixteen];

  return (
    !!filter &&
    !!setFilter && (
      <div className="filter">
        <p className="filter__name">{title}</p>

        <button
          className="filter__filter"
          onClick={() => {
            setIsDropdownVisible(current => !current);
          }}
          onBlur={() => setIsDropdownVisible(false)}
        >
          {filter}
        </button>

        {isDropdownVisible && (
          <div className="dropdown filter__dropdown">
            {filterOptions.map(filterOption => (
              <button
                key={filterOption}
                className={cn('dropdown__option', {
                  'dropdown__option--active': filter === filterOption,
                })}
                onMouseDown={() => {
                  setFilter(filterOption as FilterSetter);
                }}
                value={filterOption}
              >
                {filterOption}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  );
};
