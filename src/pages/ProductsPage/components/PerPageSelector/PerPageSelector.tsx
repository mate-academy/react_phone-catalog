import React from 'react';
import { PerPageOptions } from '../../../../enums';
import { Select } from '../../../../components';

type Props = {
  perPage: string;
  updateParams: (params: {
    perPage?: string;
    page?: number;
    sort?: string;
  }) => void;
};

export const PerPageSelect: React.FC<Props> = ({ perPage, updateParams }) => {
  const options = Object.entries(PerPageOptions).map(([, value]) => ({
    label: value,
    value,
  }));

  return (
    <div className="selectors__item">
      <label
        htmlFor="perPageSelect"
        className="selectors__type typography__small-text"
      >
        Item on page
      </label>
      <Select
        options={options}
        value={perPage}
        onChange={value => updateParams({ perPage: value, page: 1 })}
      />
    </div>
  );
};
