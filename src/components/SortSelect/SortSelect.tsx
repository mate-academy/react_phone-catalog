import React from 'react';
import { SortOptions } from '../../enums/SortOptions';
import style from './SortSelect.module.scss';
import { Select } from '../Select/Select';

interface Props {
  sort: string;
  updateParams: (params: {
    sort?: string;
    page?: number;
    perPage?: string;
  }) => void;
}

export const SortSelect: React.FC<Props> = ({ sort, updateParams }) => {
  const options = Object.entries(SortOptions).map(([label, value]) => ({
    label,
    value,
  }));

  return (
    <div className={style.sortSelect}>
      <label className={style.sortSelect__label} htmlFor="sortSelect">
        Sort by
      </label>

      <Select
        options={options}
        value={sort}
        onChange={value => updateParams({ sort: value, page: 1 })}
      />
    </div>
  );
};
