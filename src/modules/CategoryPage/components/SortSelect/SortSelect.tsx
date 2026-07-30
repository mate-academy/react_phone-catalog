import { SortType } from '../../hooks/useCategoryQueryParams';
import styles from './SortSelect.module.scss';

type Props = {
  value: SortType | null;
  onChange: (value: SortType) => void;
};

const options: { value: SortType; label: string }[] = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

export const SortSelect = ({ value, onChange }: Props) => (
  <label className={styles.field}>
    <span className={styles.label}>Sort by</span>
    <select
      className={styles.select}
      value={value ?? 'age'}
      onChange={event => onChange(event.target.value as SortType)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);
