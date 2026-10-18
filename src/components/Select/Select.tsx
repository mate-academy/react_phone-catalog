import { useId } from 'react';
import styles from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export const Select = ({ label, value, options, onChange }: Props) => {
  const selectId = useId();

  return (
    <div className={styles.select}>
      <label htmlFor={selectId} className={styles.select__label}>
        {label}
      </label>
      <select
        id={selectId}
        className={styles.select__field}
        value={value}
        onChange={event => onChange(event.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
