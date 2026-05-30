import { useSearchParams } from 'react-router-dom';
import styles from './SortSelect.module.scss';

const SORT_OPTIONS = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS = [4, 8, 16, 'All'];

export const SortSelect: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'All';

  const updateParam = (key: string, value: string) => {
    searchParams.set(key, value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterBar__group}>
        <label htmlFor="sort" className={styles.filterBar__label}>
          Sort by
        </label>

        <select
          id="sort"
          value={sort}
          onChange={e => updateParam('sort', e.target.value)}
          className={`${styles.filterBar__select} ${styles.filterBar__select_left}`}
        >
          {SORT_OPTIONS.map(option => (
            <option
              key={option.value}
              value={option.value}
              className={styles.filterBar_option}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterBar__group}>
        <label htmlFor="perPage" className={styles.filterBar__label}>
          Items on page
        </label>

        <select
          id="perPage"
          value={perPage}
          onChange={e => updateParam('perPage', e.target.value)}
          className={`${styles.filterBar__select} ${styles.filterBar__select_right}`}
        >
          {PER_PAGE_OPTIONS.map(num => (
            <option
              key={num}
              value={num.toString()}
              className={styles.filterBar_option}
            >
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
