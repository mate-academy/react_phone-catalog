import { useId } from 'react';
import styles from './Dropdown.module.scss';

type Option = { value: string; label: string };

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 6L8 11L13 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Dropdown = ({ label, value, options, onChange }: Props) => {
  const selectId = useId();

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={selectId}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select
          id={selectId}
          className={styles.select}
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={styles.chevron} aria-hidden="true">
          <ChevronIcon />
        </span>
      </div>
    </div>
  );
};
