import { useState } from 'react';
import styles from './Dropdown.module.scss';
import { ArrowIcon } from '../../../../components/icons/Arrow';

type Option<T> = {
  id: number;
  label: string;
  value: T;
};

type Props<T> = {
  options: Option<T>[];
  label: string;
  value: T;
  onChange: (value: T) => void;
};

export const Dropdown = <T extends string | number>({
  options,
  label,
  value,
  onChange,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (val: T) => {
    onChange(val);
    setIsOpen(false);
  };

  const selectedLabel =
    options.find(o => o.value === value)?.label ?? String(value);

  return (
    <div className={styles.dropdown}>
      <p className={styles.label}>{label}</p>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <p className={styles.text}>{selectedLabel}</p>
        <ArrowIcon direction={isOpen ? 'up' : 'down'} />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          {options.map(option => (
            <button
              key={option.id}
              className={styles.option}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
