import { FC } from 'react';
import styles from './Select.module.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string | number;
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: FC<Props> = ({ label, value, options, onChange }) => {
  return (
    <label className={styles.label}>
      {label}

      <select value={value} onChange={onChange} className={styles.select}>
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            className={styles.option}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
