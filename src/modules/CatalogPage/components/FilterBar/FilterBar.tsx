import styles from './FilterBar.module.scss';
import { SortBy } from '../../../shared/types';

interface Props {
  sort: SortBy;
  onSortChange: (value: SortBy) => void;
  perPage: number | 'all';
  onPerPageChange: (value: number | 'all') => void;
  perPageOptions?: Array<number | 'all'>;
  total: number;
  title: string;
}

export const FilterBar: React.FC<Props> = ({
  sort,
  onSortChange,
  perPage,
  onPerPageChange,
  perPageOptions = [4, 8, 16, 'all'],
  total,
  title,
}) => (
  <div className={styles.bar}>
    <div>
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.caption}>{total} items</p>
    </div>

    <div className={styles.controls}>
      <label className={styles.filter}>
        Sort by:
        <select
          value={sort}
          onChange={event => onSortChange(event.target.value as SortBy)}
        >
          <option value="age">Newest</option>
          <option value="title">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>
      </label>

      <label className={styles.filter}>
        Items on page:
        <select
          value={perPage}
          onChange={event =>
            onPerPageChange(
              event.target.value === 'all' ? 'all' : Number(event.target.value),
            )
          }
        >
          {perPageOptions.map(option => (
            <option key={option} value={option}>
              {option === 'all' ? 'All' : option}
            </option>
          ))}
        </select>
      </label>
    </div>
  </div>
);
