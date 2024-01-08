import { SortBy } from '../../types/SortBy';
import { DropDown } from '../DropDown';

import './ProductListFilter.scss';

const sortOptions = [
  { label: 'Newest', value: SortBy.AGE },
  { label: 'Alphabetically', value: SortBy.NAME },
  { label: 'Cheapest', value: SortBy.PRICE },
];

const perPageOptions = [
  { label: 'All', value: 'all' },
  { label: '16', value: '16' },
  { label: '8', value: '8' },
  { label: '4', value: '4' },
];

export const ProductListFilter = () => {
  return (
    <div className="ProductListFilter">
      <DropDown
        options={sortOptions}
        label="Sort by"
        searchParamName="sort"
      />

      <DropDown
        options={perPageOptions}
        label="Items on page"
        searchParamName="perPage"
      />
    </div>
  );
};
