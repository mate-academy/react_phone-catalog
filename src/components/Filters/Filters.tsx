import './Filters.scss';
import { useSearchParams } from 'react-router-dom';

import { SearchParamsType, getSearchWith } from '../../helpers/searchHelper';
import { Dropdown } from '../Dropdown';
import { OnPageOptions, SortOptions } from '../../types/SearchParamsOptions';

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onPage = searchParams.get('onPage') || 0;
  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';

  function setSearchWith(params: SearchParamsType) {
    setSearchParams(getSearchWith(searchParams, params));
  }

  const handleSortChange = (value: string) => {
    setSearchWith({ sort: value || null, page: '1' });
  };

  const handleOnPageChange = (value: string) => {
    setSearchWith({ onPage: value || null, page: '1' });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <div className="filters">
      <Dropdown
        className="filters__sort"
        label="Sort By"
        selected={sort}
        options={Object.values(SortOptions)}
        onChange={handleSortChange}
      />
      <Dropdown
        className="filters__on-page"
        label="On Page"
        selected={onPage}
        options={Object.values(OnPageOptions)}
        onChange={handleOnPageChange}
      />

      <input
        className="filters__search search"
        type="search"
        placeholder="search"
        value={query}
        onChange={handleQueryChange}
      />
    </div>
  );
};
