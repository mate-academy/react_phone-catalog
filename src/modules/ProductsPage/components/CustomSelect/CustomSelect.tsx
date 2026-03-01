import { useEffect, useRef, useState } from 'react';
import styles from './CustomSelect.module.scss';
import classNames from 'classnames';
import React from 'react';

type Option = { value: string; label: string };

type CustomSelectProps = {
  label: string;
  options: Option[];
  selected: string;
  variant?: 'bigger' | 'smaller';
  onChange: (value: string) => void;
};

export const CustomSelect = ({
  label,
  options,
  selected,
  variant,
  onChange,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const selectedLabel =
    options.find(option => option.value === selected)?.label || '';

  return (
    <div
      ref={selectRef}
      className={classNames(styles.select, {
        [styles['select--bigger']]: variant === 'bigger',
        [styles['select--smaller']]: variant === 'smaller',
      })}
    >
      <label className={styles.select__label} htmlFor={label}>
        {label}
      </label>
      <div
        className={classNames(styles.select__custom, {
          [styles['select__custom--open']]: isOpen,
        })}
        onClick={() => setIsOpen(prev => !prev)}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(prev => !prev);
          }
        }}
      >
        {selectedLabel}
        <span
          className={classNames(styles.select__arrow, {
            [styles['select__arrow--up']]: isOpen,
          })}
        />
      </div>

      {isOpen && (
        <ul className={styles.select__dropdown}>
          {options.map(option => (
            <li
              key={option.value}
              className={styles.select__option}
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
