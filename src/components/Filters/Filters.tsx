import { useSearchParams } from 'react-router-dom';
import './Filters.scss';
import { SortBy } from '../../types/SortBy';
import { SearchParamsType } from '../../types/SearchParamsTypes';

const perPageValues = ['4', '8', '16', 'All'];

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get(SearchParamsType.sortBy) || SortBy.Age;
  const perPage = searchParams.get(SearchParamsType.perPage) || 'All';

  const setSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((prevSearchParams) => {
      const params = new URLSearchParams(prevSearchParams);

      params.set(SearchParamsType.activePage, '1');
      params.set(SearchParamsType.sortBy, event.target.value);

      return params;
    });
  };

  const setPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((prevSearchParams) => {
      const params = new URLSearchParams(prevSearchParams);

      params.set(SearchParamsType.activePage, '1');
      params.set(SearchParamsType.perPage, event.target.value);

      return params;
    });
  };

  return (
    <div className="Filters">
      <div className="Filters__selection">
        <label
          htmlFor="sortParams"
          className="Filters__selection__title"
        >
          Sort by:
        </label>

        <select
          id="sortParams"
          className="Filters__selection__select"
          value={sortBy}
          onChange={setSortBy}
        >
          <option value={SortBy.Age}>Newest</option>
          <option value={SortBy.Name}>Alphabetically</option>
          <option value={SortBy.Price}>Cheapest</option>
        </select>
      </div>

      <div className="Filters__selection">
        <label
          htmlFor="itemsOnPage"
          className="Filters__selection__title"
        >
          Items on page
        </label>

        <select
          id="itemsOnPage"
          className="Filters__selection__select"
          value={perPage}
          onChange={setPerPage}
        >
          {perPageValues.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
