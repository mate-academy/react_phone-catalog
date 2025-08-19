import React from 'react';
// eslint-disable-next-line max-len
import { CustomSelect } from '../../../../shared/components/CustomSelect/CustomSelect';

import styles from './Filter.module.scss';

type Props = {
  sort: string;
  perPage: string;
  onSortChange: (newSort: string) => void;
  onPerPageChange: (newPerPage: string) => void;
};

export const Filter: React.FC<Props> = ({
  sort,
  perPage,
  onSortChange,
  onPerPageChange,
}) => {
  const sortOptions = [
    { value: 'age', label: 'Newest' },
    { value: 'title', label: 'Alphabetically' },
    { value: 'price', label: 'Cheapest' },
  ];

  const perPageOptions = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: 'All', label: 'All' },
  ];

  return (
    <div className={styles.filter}>
      <div className={`${styles.filter__group} ${styles.filter__groupSort}`}>
        <div className={styles.filter__label}>
          Sort by:
          <CustomSelect
            value={sort}
            onChange={onSortChange}
            options={sortOptions}
          />
        </div>
      </div>

      <div className={`${styles.filter__group} ${styles.filter__groupPerPage}`}>
        <div className={styles.filter__label}>
          Items per page:
          <CustomSelect
            value={perPage}
            onChange={onPerPageChange}
            options={perPageOptions}
          />
        </div>
      </div>
    </div>
  );
};
