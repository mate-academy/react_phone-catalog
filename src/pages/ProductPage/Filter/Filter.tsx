import { useState } from 'react';
import { Sort } from '../../../types/Sort';
import './Filter.scss';
import cn from 'classnames';

type Props = {
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
};

export const Filter: React.FC<Props> = ({ sort, setSort }) => {
  const [isSortDropdownVisible, setIsSortDropdownVisible] = useState(false);

  return (
    <div className="filter">
      <p className="filter__name">Sort by</p>

      <button
        className="filter__filter"
        onClick={() => {
          setIsSortDropdownVisible(current => !current);
        }}
        onBlur={() => setIsSortDropdownVisible(false)}
      >
        {sort}
      </button>

      {isSortDropdownVisible && (
        <div className="dropdown filter__dropdown">
          <button
            className={cn('dropdown__option', {
              'dropdown__option--active': sort === Sort.Newest,
            })}
            onMouseDown={() => {
              setSort(Sort.Newest);
            }}
            // onBlur={() => setIsSortDropdownVisible(false)}
            value={Sort.Newest}
          >
            Newest
          </button>
          <button
            className={cn('dropdown__option', {
              'dropdown__option--active': sort === Sort.Alphabetically,
            })}
            onMouseDown={() => setSort(Sort.Alphabetically)}
            // onBlur={() => setIsSortDropdownVisible(false)}
            value={Sort.Alphabetically}
          >
            Alphabetically
          </button>
          <button
            className={cn('dropdown__option', {
              'dropdown__option--active': sort === Sort.Cheapest,
            })}
            onMouseDown={() => setSort(Sort.Cheapest)}
            value={Sort.Cheapest}
          >
            Cheapest
          </button>
        </div>
      )}
    </div>
  );
};
