import { useState } from 'react';
import styles from './Dropdown.module.scss';
import { FaAngleDown } from 'react-icons/fa6';
import classNames from 'classnames';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export interface DropdownOption<T> {
  label: string;
  value: T;
}

interface Props<T> {
  label: string;
  options: DropdownOption<T>[];
  className?: string;
  onChange?: (value: T) => void;
  value: T;
  isDisabled?: boolean;
}

export function Dropdown<T>({
  options,
  label,
  className,
  value,
  onChange = () => {},
  isDisabled = false,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const toggleDropdown = () => {
    if (isDisabled) {
      return;
    }

    setIsOpen(curVal => !curVal);
  };

  const handleSelect = (value: T) => {
    if (isDisabled) {
      return;
    }

    onChange(value);
    setIsOpen(false);
  };

  const activeOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={classNames(
          styles.dropdown,
          {
            [styles.active]: isOpen && !isDisabled,
            [styles.disabled]: isDisabled,
          },
          className,
        )}
        ref={ref}
      >
        <div className={styles.activeValueWrapper}>
          <button className={styles.activeValue} onClick={toggleDropdown}>
            {activeOption.label}
          </button>
          <span className={styles.arrow}>
            <FaAngleDown size={16} />
          </span>
        </div>

        <ul className={styles.options}>
          {options.map(option => (
            <li
              onClick={() => handleSelect(option.value)}
              key={option.label.toLowerCase()}
              className={classNames(styles.option, {
                [styles.activeOption]: option.value === value,
              })}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
