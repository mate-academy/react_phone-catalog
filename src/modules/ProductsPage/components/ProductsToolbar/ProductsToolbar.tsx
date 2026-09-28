import { ChangeEvent } from 'react';

import { PerPageValue, SortValue } from '../../../shared/types/Product';
import styles from './ProductsToolbar.module.scss';

type Props = {
  sort: SortValue;
  perPage: PerPageValue;
  showPerPage: boolean;
  onSortChange: (sort: SortValue) => void;
  onPerPageChange: (perPage: PerPageValue) => void;
};

export const ProductsToolbar = ({
  sort,
  perPage,
  showPerPage,
  onSortChange,
  onPerPageChange,
}: Props) => {
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortValue);
  };

  const handlePerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onPerPageChange(event.target.value as PerPageValue);
  };

  return (
    <div className={styles.toolbar}>
      <label>
        <span>Sort by</span>

        <select value={sort} onChange={handleSortChange}>
          <option value="age">Newest</option>
          <option value="title">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>
      </label>

      {showPerPage && (
        <label>
          <span>Items on page</span>

          <select value={perPage} onChange={handlePerPageChange}>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </label>
      )}
    </div>
  );
};
