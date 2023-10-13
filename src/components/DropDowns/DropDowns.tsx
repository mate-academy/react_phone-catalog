import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../../types/SortOptions';
import { NumberOptions } from '../../types/NumberOptions';

import './DropDowns.scss';

export const Dropdowns = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedValueSortBy = searchParams.get('sortBy') || SortBy.NEWEST;
  // eslint-disable-next-line max-len
  const selectedValueSortNumber
    = searchParams.get('NumberOptions') || NumberOptions.FOUR;

  function handleChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    paramName: string,
  ) {
    const params = new URLSearchParams(searchParams);

    params.set(paramName, event.target.value);

    setSearchParams(params);
  }

  return (
    <div className="dropdowns">
      <div className="dropdowns__sort--wrapper">
        <p>Sort by</p>
        <select
          value={selectedValueSortBy}
          onChange={e => handleChange(e, 'sortBy')}
          className="dropdowns__sort"
          data-cy="paginationLeft"
        >
          {Object.values(SortBy).map(option => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="dropdowns__items--wrapper">
        <p>Items on page</p>
        <select
          value={selectedValueSortNumber}
          onChange={e => handleChange(e, 'NumberOptions')}
          className="dropdowns__items"
          data-cy="paginationRight"
        >
          {Object.values(NumberOptions).map(option => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
