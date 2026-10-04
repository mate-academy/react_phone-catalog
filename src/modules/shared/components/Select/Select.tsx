import { ChangeEvent, useId } from 'react';
import cn from 'classnames';
import { Icon } from '../Icon';
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
  className?: string;
}

export const Select = ({
  label,
  value,
  options,
  onChange,
  className,
}: Props) => {
  const id = useId();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={cn(styles.field, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <div className={styles.wrapper}>
        <select
          id={id}
          className={styles.select}
          value={value}
          onChange={handleChange}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Icon name="chevron-down" className={styles.chevron} />
      </div>
    </div>
  );
};
