import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import './ListControls.scss';
import {
  PerPage,
  PerPageSelect,
  SelectOption,
  SortBy,
  SortParams,
} from '../../types/select';
import { MySelect } from '../UI/MySelect';
import { getSearchParamsWith } from '../../helpers/searchParams';

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

const PER_PAGE_OPTIONS: PerPage[] = ['16', '8', '4'];

const sortParams = {
  name: SortBy.Alphabetically,
  age: SortBy.Newest,
  price: SortBy.Cheapest,
};

function getPerPageOption(perPage: string): PerPage | null {
  if (!Number.isFinite(+perPage)) {
    return null;
  }

  const margins: number[] = [];

  PER_PAGE_OPTIONS.forEach(el => {
    margins.push(Math.abs(+el - +perPage));
  });

  const min = Math.min(...margins);
  const newPerPage = PER_PAGE_OPTIONS[margins.indexOf(min)];

  return newPerPage;
}

export const ListControls = () => {
  const [searchParams] = useSearchParams();
  const { hash } = useLocation();
  const navigate = useNavigate();

  const sort = (searchParams.get('sort') || 'age') as SortParams;
  const perPage = (searchParams.get('perPage') || 'all') as PerPage;

  useEffect(() => {
    if (!PER_PAGE_OPTIONS.includes(perPage)) {
      const newPerPage = getPerPageOption(perPage);

      navigate({
        hash,
        search: getSearchParamsWith(
          { perPage: newPerPage },
          searchParams,
        ),
      });
    }
  }, [hash, navigate, perPage, searchParams]);

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
          defaultValue={perPage === 'all' ? 'All' : perPage}
          title="Items on page"
          options={PER_PAGE}
          searchName="perPage"
        />
      </div>
    </div>
  );
};
