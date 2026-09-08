import { Dropdown, DropdownOption } from '@/modules/shared/components/Dropdown';
import styles from './Filters.module.scss';
import { SortOptions } from '@/utils/filterProducts';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '@/utils/getSearchWith';
import { PerPageOption } from '@/modules/shared/types/PerPageOption';

const sortOptions: DropdownOption<string | null>[] = [
  {
    label: 'Newest',
    value: null,
  },
  {
    label: 'Alphabetically',
    value: 'alphabetically',
  },
  {
    label: 'Cheapest',
    value: 'cheapest',
  },
];
const itemsPerPage: DropdownOption<string | null>[] = [
  {
    label: 'All',
    value: null,
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '8',
    value: '8',
  },
  {
    label: '16',
    value: '16',
  },
];

interface Props {
  isDisabled?: boolean;
  initialSortOption: SortOptions;
  initialPerPage: PerPageOption;
}

export const Filters: FC<Props> = ({
  isDisabled = false,
  initialPerPage,
  initialSortOption,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeURLParmas = (option: Record<string, string | null>) => {
    setSearchParams(getSearchWith(option, searchParams));
  };

  return (
    <div className={styles.filters}>
      <div className={styles.sortFilter}>
        <Dropdown
          label="Sort by"
          options={sortOptions}
          className={styles.dropdown}
          isDisabled={isDisabled}
          value={initialSortOption}
          onChange={value => handleChangeURLParmas({ sort: value })}
        />
      </div>
      <div className={styles.perPageFilter}>
        <Dropdown
          label="Items on page"
          options={itemsPerPage}
          className={styles.dropdown}
          value={initialPerPage}
          isDisabled={isDisabled}
          onChange={value => handleChangeURLParmas({ perPage: value })}
        />
      </div>
    </div>
  );
};
