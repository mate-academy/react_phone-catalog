import React from 'react';
import { PerPageOptions } from '../../enums/PerPageOptions';
import { Select } from '../Select/Select';
import style from './PerPageSelect.module.scss';

interface Props {
  perPage: string;
  updateParams: (params: {
    sort?: string;
    page?: number;
    perPage?: string;
  }) => void;
}

export const PerPageSelect: React.FC<Props> = ({ perPage, updateParams }) => {
  const options = Object.entries(PerPageOptions).map(([, value]) => ({
    label: value,
    value,
  }));

  return (
    <div className={style.perPage}>
      <label htmlFor="perPageSelect">Items on page</label>
      <Select
        options={options}
        value={perPage}
        onChange={value => updateParams({ perPage: value, page: 1 })}
      />
    </div>
  );
};
