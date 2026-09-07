import React from 'react';
import styles from './ControlsContainer.module.scss';

interface ControlsContainerProps {
  sortBy: string;
  onSortByChange: (value: string) => void;
  itemsPerPage: string;
  onItemsPerPageChange: (value: string) => void;
}

const ControlsContainer: React.FC<ControlsContainerProps> = ({
  sortBy,
  onSortByChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  return (
    <div className={styles.controlsContainer}>
      <div className={styles.sortByContainer}>
        <label htmlFor="sort-by-select" className={styles.sortByLabel}>
          Sort by
        </label>
        <select
          id="sort-by-select"
          name="sort"
          className={styles.sortSelect}
          value={sortBy}
          onChange={e => onSortByChange(e.target.value)}
        >
          <option value="age">Newest</option>
          <option value="name">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>
      </div>

      <div className={styles.itemsPerPageContainer}>
        <label
          htmlFor="items-per-page-select"
          className={styles.itemPerPageLabel}
        >
          Items on page
        </label>
        <select
          id="items-per-page-select"
          name="pagination"
          className={styles.paginationSelect}
          value={itemsPerPage}
          onChange={e => onItemsPerPageChange(e.target.value)}
        >
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="24">24</option>
          <option value="all">All</option>
        </select>
      </div>
    </div>
  );
};

export default ControlsContainer;
