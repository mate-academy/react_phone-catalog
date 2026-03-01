import React from 'react';
import styles from './Select.module.scss';
import { CustomSelect } from '../CustomSelect';
import { selectItemsOnPage, selectSortBy } from '../../utilis/selectOptions';

type SelectProps = {
  onPerPageChange: (value: 'all' | string) => void;
  perPage: string;
  onSortChange: (value: string) => void;
  sort: string;
};

export const Select = ({
  onPerPageChange,
  perPage,
  onSortChange,
  sort,
}: SelectProps) => {
  return (
    <div className={styles.selectSection}>
      <CustomSelect
        label="Sort by"
        selected={sort}
        onChange={onSortChange}
        variant="bigger"
        options={selectSortBy}
      />
      <CustomSelect
        label="Items on page"
        selected={perPage}
        onChange={onPerPageChange}
        variant="smaller"
        options={selectItemsOnPage}
      />
    </div>
  );
};
