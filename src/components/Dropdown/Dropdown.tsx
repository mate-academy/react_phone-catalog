import styles from './Dropdown.module.scss';

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  label: string;
  value: string | number;
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
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
