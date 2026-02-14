import styles from './AppSelect.module.scss';
import { FiChevronDown } from 'react-icons/fi';

type AppSelectProps = {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: string[];
  width?: string;
};

export const AppSelect = ({
  id,
  value,
  onChange,
  label,
  width,
  options,
}: AppSelectProps) => {
  return (
    <div className={styles.container} style={{ ...(width ? { width } : {}) }}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.selectWrapper}>
        <select
          name="select-name"
          id={id}
          className={styles.select}
          value={value}
          onChange={onChange}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FiChevronDown className={styles.chevron} size={24} />
      </div>
    </div>
  );
};
