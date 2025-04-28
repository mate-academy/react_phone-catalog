import { useState } from 'react';
import styles from './CustomSelect.module.scss';
import { ArrowIconDown } from '../Icons/ArrowIcon';
import classNames from 'classnames';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const CustomSelect: React.FC<Props> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find(option => option.value === value)?.label;

  return (
    <div
      className={classNames(`${styles.select}`, { [styles.open]: isOpen })}
      onClick={() => setIsOpen(!isOpen)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
    >
      <div className={styles.select__current}>
        {selectedLabel}
        <ArrowIconDown />
      </div>

      <ul className={styles.select__dropdown}>
        {options.map(option => (
          <li
            key={option.value}
            className={classNames(styles.select__option, {
              [styles.selected]: option.value === value,
            })}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
