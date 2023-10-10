import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../../Type/SortByOptions';
import { NumberOptions } from '../../Type/NumberOptions';

import './dropdowns.scss';

export const Dropdowns = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedValueSortBy = searchParams.get('sortBy') || 'Newest';
  const selectedValueSortNumber = searchParams.get('NumberOptions') || '4';

  function handleChangeSortBy(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('sortBy', event.target.value);
    setSearchParams(params);
  }

  function handleChangeSortNumber(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('NumberOptions', event.target.value);
    setSearchParams(params);
  }

  return (
    <div className="dropdowns">
      <div className="dropdowns__sort--wrapper">
        <p>Sort by</p>
        <select
          value={selectedValueSortBy}
          onChange={handleChangeSortBy}
          className="dropdowns__sort"
          data-cy="paginationLeft"
        >
          <option value={SortBy.NEWEST}>{SortBy.NEWEST}</option>
          <option value={SortBy.ALPHABETICALLY}>{SortBy.ALPHABETICALLY}</option>
          <option value={SortBy.CHEAPEST}>{SortBy.CHEAPEST}</option>
        </select>
      </div>

      <div className="dropdowns__items--wrapper">
        <p>Items on page</p>
        <select
          value={selectedValueSortNumber}
          onChange={handleChangeSortNumber}
          className="dropdowns__items"
          data-cy="paginationRight"
        >
          <option value={NumberOptions.Four}>{NumberOptions.Four}</option>
          <option value={NumberOptions.Eight}>{NumberOptions.Eight}</option>
          <option value={NumberOptions.Sixtten}>{NumberOptions.Sixtten}</option>
          <option value={NumberOptions.All}>{NumberOptions.All}</option>
        </select>
      </div>
    </div>
  );
};
