import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomDropdown.module.scss';
import classNames from 'classnames';

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

export const CustomDropdown: React.FC<Props> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find(option => option.value === value);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <label className={styles.label}>{label}</label>
      <button
        className={classNames(styles.selector, { [styles.open]: isOpen })}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selected?.label || 'Select'}
        <img
          src={`/react_phone-catalog/img/icons/chevron-${isOpen ? 'up' : 'down'}.svg`}
          alt="arrow"
          className={styles.icon}
        />
      </button>

      {isOpen && (
        <ul className={styles.options}>
          {options.map(option => (
            <li
              key={option.value}
              className={classNames(styles.option, {
                [styles.active]: value === option.value,
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
      )}
    </div>
  );
};
