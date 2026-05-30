import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';

export interface SelectOption<T extends string | number> {
  value: T;
  label: string;
}

interface Props<T extends string | number> {
  label: string;
  id: string;
  options: SelectOption<T>[];
  currentValue: T;
  onChange: (value: T) => void;
}

export const Select = <T extends string | number>({
  label,
  id,
  options,
  currentValue,
  onChange,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: T) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === currentValue);
  const displayValue = selectedOption
    ? selectedOption.label
    : String(currentValue);

  return (
    <div className={styles.group} ref={selectRef}>
      <label htmlFor={id} className={styles.group__label}>
        {label}
      </label>
      <div
        id={id}
        className={classNames(styles.selectControl, {
          [styles['selectControl--open']]: isOpen,
        })}
        onClick={handleToggle}
        tabIndex={0}
      >
        <div className={styles.selectControl__input}>{displayValue}</div>
        <img
          src={isOpen ? './icons/arr_up.png' : './icons/arr_down.png'}
          alt={isOpen ? 'Collapse' : 'Expand'}
          className={styles.selectControl__arrow}
        />
      </div>
      {isOpen && (
        <ul id={`${id}-dropdown`} className={styles.dropdown}>
          {options.map(option => (
            <li
              key={String(option.value)}
              className={styles.dropdown__item}
              onClick={() => handleOptionClick(option.value)}
              tabIndex={0}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
