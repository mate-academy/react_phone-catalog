import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';

import styles from './SortSelector.module.scss';
import classNames from 'classnames';

type Option = { value: string; label: string };

type Props = {
  label: string;
  defaultValue: string;
  param: 'sort' | 'perPage';
  options: Option[];
};

export const SortSelector: React.FC<Props> = ({
  label,
  defaultValue,
  param,
  options,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(param) ?? defaultValue;
  const selected = options.find(option => option.value === value);

  const handleSelect = (option: Option) => {
    const params = new URLSearchParams(searchParams);

    if (option.value === defaultValue) {
      params.delete(param);
    } else {
      params.set(param, option.value);
    }

    params.delete('page');

    setSearchParams(params);
    setIsOpen(false);
  };

  useEffect(() => {
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== 'Escape') {
        return;
      }

      if (
        event instanceof MouseEvent &&
        selectRef.current?.contains(event.target as Node)
      ) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('keydown', close);
    document.addEventListener('mousedown', close);

    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('mousedown', close);
    };
  }, []);

  return (
    <div className={styles['sort-selector']} ref={selectRef}>
      <span className={styles['sort-selector__label']}>{label}</span>

      <div className={styles.select}>
        <button
          type="button"
          className={classNames(styles.select__header, {
            [styles['select__header--active']]: isOpen,
          })}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(prev => !prev)}
        >
          {selected?.label}
          <IoIosArrowDown className={styles.select__arrow} />
        </button>

        <ul className={styles.select__menu} role="listbox">
          {options.map(option => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={styles.select__option}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
