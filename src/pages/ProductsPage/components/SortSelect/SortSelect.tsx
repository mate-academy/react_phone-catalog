import React from 'react';
import { SortOptions } from '../../../../enums';
import { Select } from '../../../../components';

type Props = {
  sort: string;
  updateParams: (params: {
    sort?: string;
    page?: number;
    perPage?: string;
  }) => void;
};

export const SortSelect: React.FC<Props> = ({ sort, updateParams }) => {
  const options = Object.entries(SortOptions).map(([label, value]) => ({
    label,
    value,
  }));

  return (
    <div className="selectors__item">
      <label
        htmlFor="sortSelect"
        className="selectors__type typography__small-text"
      >
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
