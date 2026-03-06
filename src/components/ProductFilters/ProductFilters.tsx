import { Dropdowns } from '../Dropdowns/Dropdowns';
import s from './ProductFilters.module.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';

const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const itemsOptions = [
  { value: 'all', label: 'all' },
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
];

export const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get('perPage') || 'all';
  const sortBy = searchParams.get('sort') || 'age';

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
          options={sortOptions}
        />
      </div>
      <div className={s.contentItems}>
        <label className={s.label}>Items on page</label>
        <Dropdowns
          selected={perPage}
          onChange={(newPerPage) => {
            const valueToSet = newPerPage === 'all' ? null : newPerPage;
            setSearchWith({ perPage: valueToSet, page: null });
          }}
          options={itemsOptions}
        />
      </div>
    </div>
  );
};
