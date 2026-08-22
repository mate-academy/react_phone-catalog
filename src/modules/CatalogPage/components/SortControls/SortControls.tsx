import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../../../utils/getSearchWith';
import styles from './SortControls.module.scss';

const SORT_OPTIONS = [
  { value: '', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

export const SortControls: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || 'all';

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { sort: event.target.value || null }),
    );
  };

  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSearchParams(
      getSearchWith(searchParams, {
        perPage: value === 'all' ? null : value,
        page: null,
      }),
    );
  };

  return (
    <div className={styles.controls}>
      <label className={styles.controls__field}>
        <span className={styles.controls__label}>Sort by</span>
        <select
          className={styles.controls__select}
          value={sort}
          onChange={handleSortChange}
          data-cy="sortSelector"
        >
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.controls__field}>
        <span className={styles.controls__label}>Items on page</span>
        <select
          className={styles.controls__select}
          value={perPage}
          onChange={handlePerPageChange}
          data-cy="perPageSelector"
        >
          {PER_PAGE_OPTIONS.map(option => (
            <option key={option} value={option}>
              {option === 'all' ? 'All' : option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
