// eslint-disable-next-line import/no-extraneous-dependencies
import Select from 'react-select';
import styles from './ProductsFilters.module.scss';

type Props = {
  sort: string;
  perPage: string;
  onSortChange: (value: string) => void;
  onPerPageChange: (value: string) => void;
};

const sortOptions = [
  { value: 'year', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const perPageOptions = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export const ProductsFilters: React.FC<Props> = ({
  sort,
  perPage,
  onSortChange,
  onPerPageChange,
}) => {
  return (
    <form className={styles.filters}>
      <div
        className={`${styles.filters__group} ${styles['filters__group--sort']}`}
      >
        <label htmlFor="sort-select" className={styles.filters__label}>
          Sort by
        </label>

        <Select
          classNamePrefix="rs"
          isSearchable={false}
          value={sortOptions.find(o => o.value === sort)}
          options={sortOptions}
          onChange={option => {
            if (option) {
              onSortChange(option.value);
            }
          }}
        />
      </div>

      <div
        className={`${styles.filters__group} ${styles['filters__group--per-page']}`}
      >
        <label htmlFor="per-page-select" className={styles.filters__label}>
          Items per page
        </label>

        <Select
          classNamePrefix="rs"
          isSearchable={false}
          value={perPageOptions.find(o => o.value === perPage)}
          options={perPageOptions}
          onChange={option => {
            if (option) {
              onPerPageChange(option.value);
            }
          }}
        />
      </div>
    </form>
  );
};
