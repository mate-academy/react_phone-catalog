import styles from './Dropdown.module.scss';

type Option = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  label: string;
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Dropdown: React.FC<Props> = ({
  value,
  label,
  options,
  onChange,
}) => {
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
