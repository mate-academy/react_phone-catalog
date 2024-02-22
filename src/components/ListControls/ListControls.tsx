import { useSearchParams } from 'react-router-dom';
import {
  PerPageSelect,
  SelectOption,
  SortBy,
  SortParams,
} from '../../types/select';
import { MySelect } from '../UI/MySelect';
import './ListControls.scss';

const SORT_BY: SelectOption[] = [
  { age: SortBy.Newest },
  { name: SortBy.Alphabetically },
  { price: SortBy.Cheapest },
];

const PER_PAGE: PerPageSelect[] = [
  { All: 'all' },
  { 16: '16' },
  { 8: '8' },
  { 4: '4' },
];

const sortParams = {
  name: SortBy.Alphabetically,
  age: SortBy.Newest,
  price: SortBy.Cheapest,
};

export const ListControls = () => {
  const [searchParams] = useSearchParams();
  const sort = (searchParams.get('sort') || 'age') as SortParams;
  const perPage = searchParams.get('perPage') || 'all';

  return (
    <div className="list-controls">
      <div className="list-controls--left">
        <MySelect
          defaultValue={sortParams[sort]}
          title="Sort by"
          options={SORT_BY}
          searchName="sort"
        />
      </div>

      <div className="list-controls--right">
        <MySelect
          defaultValue={perPage === 'all' ? 'All' : perPage.toString()}
          title="Items on page"
          options={PER_PAGE}
          searchName="perPage"
        />
      </div>
    </div>
  );
};
