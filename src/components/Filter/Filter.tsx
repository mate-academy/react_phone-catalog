import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../../app/store';
import { searchedFilterStatus } from '../../features/filter';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import './Filter.scss';


const sortOptions = [
  { label: 'Newest', value: 'age' },
  { label: 'Alphabetically', value: 'title' },
  { label: 'Cheapest', value: 'price' },
] as const;

type SortValue = (typeof sortOptions)[number]['value'];
type SortLabel = (typeof sortOptions)[number]['label'];

export const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const filterStatus = useSelector(
    (state: RootState) => state.filter.filterStatus,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value: SortValue) => {
    dispatch(searchedFilterStatus(value));
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sort: value,
    });
    setIsOpen(false);
  };

  const getLabelFromValue = (value: SortValue | null): SortLabel => {
    const found = sortOptions.find(opt => opt.value === value);
    return found ? found.label : 'Newest';
  };

  useEffect(() => {
    const sortParam = searchParams.get('sort') as SortValue | null;
    const validValues = sortOptions.map(o => o.value);
    if (!sortParam || !validValues.includes(sortParam)) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: 'age',
      });
    } else {
      if (filterStatus !== sortParam) {
        dispatch(searchedFilterStatus(sortParam));
      }
    }
  }, [searchParams, setSearchParams, dispatch, filterStatus]);

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <div
          className="select"
          style={{ position: 'relative', userSelect: 'none' }}
        >
          <div
            className="select__field"
            data-cy="statusSelect"
            onClick={() => setIsOpen(open => !open)}
          >
            <span className="select__input">
              {getLabelFromValue(filterStatus)}
            </span>
            {isOpen ? (
              <IoIosArrowUp color="#89939A" />
            ) : (
              <IoIosArrowDown color="#89939A" />
            )}
          </div>

          {isOpen && (
            <div
              className="sort__filter"
            >
              {sortOptions.map(({ label, value }) => (
                <div
                  key={value}
                  onClick={() => handleOptionClick(value)}
                  className="sort__filter__option"
                  style={{
                    backgroundColor:
                      filterStatus === value ? '#E2E6E9' : 'white',
                    color: filterStatus === value ? '#313237' : '#89939A',
                    
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>
      </p>
    </form>
  );
};

export default Filter;
