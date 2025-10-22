import React from 'react';
import {
  SORT_OPTIONS,
  ITEMS_PER_PAGE_OPTIONS,
  DEFAULT_SORT_BY,
  DEFAULT_ITEMS_PER_PAGE,
  ITEMS_PER_PAGE_OPTIONS2,
} from '../../../../utils/constants';
import CustomSelect2 from '../../../../components/CustomSelect2/CustomSelect2';
import styles from './SortFilterBar.module.scss';
import classNames from 'classnames';

interface SortFilterBarProps {
  currentSortBy: string;
  setSortBy: (sortBy: string) => void;
  currentPerPage: string;
  setPerPage: (perPage: string) => void;
}

const SortFilterBar: React.FC<SortFilterBarProps> = ({
  currentSortBy,
  setSortBy,
  currentPerPage,
  setPerPage,
}) => {
  return (
    <div className={styles['sort-filter-bar']}>
      <div
        className={classNames(
          styles['sort-filter-bar__item'],
          styles['sort-filter-bar__sort-by'],
        )}
      >
        <CustomSelect2
          options={SORT_OPTIONS}
          currentValue={currentSortBy}
          description="Sort by"
          onChange={setSortBy}
        />
      </div>

      <div
        className={classNames(
          styles['sort-filter-bar__item'],
          styles['sort-filter-bar__page'],
        )}
      >
        <CustomSelect2
          options={ITEMS_PER_PAGE_OPTIONS}
          currentValue={currentPerPage}
          description="Items per page"
          onChange={setPerPage}
        />
      </div>
    </div>
  );
};

export default SortFilterBar;
