import { SortBy, ItemsPerPage } from '../../../../types';
import {
  SORT_OPTIONS,
  ITEMS_PER_PAGE_OPTIONS,
} from '../../../shared/constants/sortOptions';
import styles from './Filters.module.scss';

interface Props {
  sortBy: SortBy;
  itemsPerPage: ItemsPerPage;
  onSortChange: (sortBy: SortBy) => void;
  onItemsPerPageChange: (itemsPerPage: ItemsPerPage) => void;
  totalItems: number;
}

export const PhonePageFilter: React.FC<Props> = ({
  sortBy,
  itemsPerPage,
  onSortChange,
  onItemsPerPageChange,
  totalItems,
}) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortBy);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onItemsPerPageChange(event.target.value as ItemsPerPage);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filters__item}>
        <label htmlFor="sort-select" className={styles.filters__label}>
          Sort by
        </label>
        <select
          id="sort-select"
          className={styles.filters__select}
          value={sortBy}
          onChange={handleSortChange}
        >
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filters__item}>
        <label htmlFor="items-select" className={styles.filters__label}>
          Items per page
        </label>
        <select
          id="items-select"
          className={styles.filters__select}
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          {ITEMS_PER_PAGE_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filters__count}>{totalItems} items</div>
    </div>
  );
};
