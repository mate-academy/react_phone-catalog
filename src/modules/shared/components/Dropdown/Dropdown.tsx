import classNames from 'classnames';
import ArrowDownIcon from '../../../../assets/icons/arrow-down.svg?react';
import styles from './Dropdown.module.scss';

export interface DropdownOption {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  className?: string;
}

export const Dropdown = ({
  label,
  value,
  options,
  onChange,
  className,
}: Props) => (
  <label className={classNames(styles.dropdown, className)}>
    <span className={styles.label}>{label}</span>

    <span className={styles.control}>
      <select
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

      <ArrowDownIcon className={styles.arrow} />
    </span>
  </label>
);
