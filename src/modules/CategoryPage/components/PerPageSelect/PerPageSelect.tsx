import { PerPageValue } from '../../hooks/useCategoryQueryParams';
import styles from './PerPageSelect.module.scss';

type Props = {
  value: PerPageValue;
  onChange: (value: PerPageValue) => void;
};

const options: PerPageValue[] = ['4', '8', '16', 'all'];

export const PerPageSelect = ({ value, onChange }: Props) => (
  <label className={styles.field}>
    <span className={styles.label}>Items on page</span>
    <select
      className={styles.select}
      value={value}
      onChange={event => onChange(event.target.value as PerPageValue)}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option === 'all' ? 'All' : option}
        </option>
      ))}
    </select>
  </label>
);
