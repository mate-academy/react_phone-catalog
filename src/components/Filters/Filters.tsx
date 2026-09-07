import React from 'react';
import { SelectBox } from '../SelectBox/SelectBox';
import style from './Filters.module.scss';

export enum SortOptions {
  Newest = 'Newest',
  Alphabetically = 'Alphabetically',
  Cheapest = 'Cheapest',
}

type Props = {
  sort: SortOptions;
  perPage: string;
  onSortChange: (value: SortOptions) => void;
  onPerPageChange: (value: string) => void;
  onPageChange: (page: number) => void;
};

export const Filters: React.FC<Props> = ({
  sort,
  perPage,
  onSortChange,
  onPerPageChange,
  onPageChange,
}) => {
  return (
    <div className={style.catalog_filters}>
      <SelectBox
        value={sort}
        onChange={value => {
          onSortChange(value as SortOptions);
          onPageChange(1);
        }}
        options={[
          { label: 'Newest', value: SortOptions.Newest },
          { label: 'Alphabetically', value: SortOptions.Alphabetically },
          { label: 'Cheapest', value: SortOptions.Cheapest },
        ]}
        title="Sort by"
      />

      <SelectBox
        title="Items on page"
        value={perPage}
        onChange={value => {
          onPerPageChange(value);
          onPageChange(1);
        }}
        options={[
          { label: '4', value: '4' },
          { label: '8', value: '8' },
          { label: '16', value: '16' },
          { label: 'All', value: 'all' },
        ]}
      />
    </div>
  );
};
