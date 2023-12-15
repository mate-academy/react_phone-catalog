import { useMemo } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { Select } from '../../Select';
import {
  perPageOptions,
  sortByOptions,
} from '../../../variables/selectOptions';

interface Props {
  sortValue: string | null;
  perPageValue: string | null;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export const ProductFilters: React.FC<Props> = ({
  sortValue,
  perPageValue,
  searchParams,
  setSearchParams,
}) => {
  const getSortOption = useMemo(() => {
    return sortByOptions.filter((option) => option.value === sortValue)[0];
  }, [sortValue]);

  const getPerPageOption = useMemo(() => {
    return perPageOptions.filter((option) => {
      return option.value === perPageValue;
    })[0];
  }, [perPageValue]);

  return (
    <div className="products-list__filters">
      <div className="products-list__filter">
        <div className="products-list__label">Sort by</div>
        <Select
          paramsKey="sort"
          options={sortByOptions}
          selectedOption={getSortOption}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

      <div className="products-list__filter">
        <div className="products-list__label">Items on page</div>
        <Select
          paramsKey="perPage"
          options={perPageOptions}
          selectedOption={getPerPageOption}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
};
