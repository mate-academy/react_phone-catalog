import { FC } from 'react';
// eslint-disable-next-line max-len
import { CustomSelect } from '../../../shared/components/CustomSelect/CustomSelect';
import { Option } from '../../../shared/components/CustomSelect/CustomSelect';
import s from './Filter.module.scss';

export const Filter: FC = () => {
  const sortOptions: Option[] = [
    { value: 'age', label: 'Newest' },
    { value: 'title', label: 'Alphabetically' },
    { value: 'price', label: 'Cheapest' },
  ];

  const itemsOptions: Option[] = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: 'all', label: 'All' },
  ];

  return (
    <div className={s.filterContainer}>
      <div className={s.sortFilter}>
        <span className={s.label}>Sort by</span>
        <CustomSelect
          options={sortOptions}
          placeholder="Newest"
          onSelect={() => {}}
        />
      </div>
      <div className={s.itemsFilter}>
        <span className={s.label}>Items on page</span>
        <CustomSelect
          options={itemsOptions}
          placeholder="16"
          onSelect={() => {}}
        />
      </div>
    </div>
  );
};
