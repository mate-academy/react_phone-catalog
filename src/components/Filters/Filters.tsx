import './Filters.scss';
import { useSearchParams } from 'react-router-dom';

import { SearchParamsType, getSearchWith } from '../../helpers/searchHelper';
import { Dropdown } from '../Dropdown';
import { OnPageOptions, SortOptions } from '../../types/SearchParamsOptions';

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onPage = searchParams.get('onPage') || 0;
  const sort = searchParams.get('sort') || '';

  function setSearchWith(params: SearchParamsType) {
    setSearchParams(getSearchWith(searchParams, params));
  }

  const handleSortChange = (value: string) => {
    setSearchWith({ sort: value || null, page: '1' });
  };

  const handleOnPageChange = (value: string) => {
    setSearchWith({ onPage: value || null, page: '1' });
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
    </div>
  );
};
