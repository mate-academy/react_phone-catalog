import { FC } from 'react';
import { CustomSelect } from '../../../shared/components/CustomSelect';
import { PER_PAGE_OPTIONS, SORT_OPTIONS } from '../../../shared/constants';
import s from './Filter.module.scss';
import { SearchBar } from '../../../shared/components/SearchBar';

interface Props {
  sortBy: string;
  onSort: (sortBy: string) => void;
  perPage: string;
  onPerPageChange: (perPage: string) => void;
}

export const Filter: FC<Props> = ({
  sortBy,
  onSort,
  perPage,
  onPerPageChange,
}) => {
  return (
    <div className={s.filterContainer}>
      <div className={s.searchWrapper}>
        <SearchBar />
      </div>

      <div className={s.sortFilter}>
        <span className={s.label}>Sort by</span>
        <CustomSelect options={SORT_OPTIONS} value={sortBy} onSelect={onSort} />
      </div>
      <div className={s.itemsFilter}>
        <span className={s.label}>Items on page</span>
        <CustomSelect
          options={PER_PAGE_OPTIONS}
          value={perPage}
          onSelect={onPerPageChange}
        />
      </div>
    </div>
  );
};
