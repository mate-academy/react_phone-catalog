import { useId } from 'react';
import cn from 'classnames';
import styles from './Dropdown.module.scss';

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

export const Dropdown: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
  className,
}) => {
  const selectId = useId();

  return (
    <div className={cn(styles.dropdown, className)}>
      <label className={styles.label} htmlFor={selectId}>
        {label}
      </label>

      <select
        id={selectId}
        className={styles.select}
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
