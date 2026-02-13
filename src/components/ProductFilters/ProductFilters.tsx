import { Dropdowns } from '../Dropdowns/Dropdowns';
import s from './ProductFilters.module.scss';
import { useSearchParams } from 'react-router-dom';

import { getSearchWith, SearchParams } from '../../utils/searchHelper';

const sortField: string[] = ['Newest', 'Alphabetically', 'Cheapest'];
const itemsOptions: string[] = ['All', '4', '8', '16'];

export const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get('perPage') || 'All';
  const sortBy = searchParams.get('sort') || 'Newest';

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);
    setSearchParams(search);
  }

  return (
    <div className={s.container}>
      <div className={s.contentSort}>
        <span className={s.label}>Sort by</span>
        <Dropdowns
          selected={sortBy}
          onChange={(newSort) => {
            setSearchWith({ sort: newSort });
          }}
          options={sortField}
        />
      </div>
      <div className={s.contentItems}>
        <label className={s.label}>Items on page</label>
        <Dropdowns
          selected={perPage}
          onChange={(newPerPage) => {
            setSearchWith({ perPage: newPerPage, page: '1' });
          }}
          options={itemsOptions}
        />
      </div>
    </div>
  );
};
