import styles from './SelectControl.module.scss';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  name: string;
  options: SelectOption[];
  defaultValue?: string;
};

export const SelectControl: React.FC<Props> = ({
  label,
  name,
  options,
  defaultValue = '',
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(name) || defaultValue || options[0].value;

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleChange = (newValue: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (name === 'perPage' && newValue === 'all') {
      newSearchParams.delete('perPage');
      newSearchParams.delete('page');
    } else if (newValue === defaultValue) {
      newSearchParams.delete(name);
    } else {
      newSearchParams.set(name, newValue);
    }

    if (name === 'sort' || name === 'perPage') {
      newSearchParams.delete('page');
    }

    setSearchParams(newSearchParams);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find(o => o.value === value)?.label || 'Select';

  return (
    <div className={styles.selectControl}>
      <label className={styles.selectControl__label}>{label}</label>

      <div
        className={classNames(styles.selectControl__selectBox, {
          [styles['selectControl__selectBox--open']]: isOpen,
        })}
        onClick={toggleOpen}
        ref={ref}
        tabIndex={0}
      >
        <span className={styles.selectControl__selectedLabel}>
          {selectedLabel}
        </span>
        <span
          className={classNames(styles.selectControl__arrow, {
            [styles['selectControl__arrow--open']]: isOpen,
          })}
        />
        <ul
          className={classNames(styles.selectControl__options, {
            [styles['selectControl__options--open']]: isOpen,
            [styles['selectControl__options--closed']]: !isOpen,
          })}
        >
          {options.map(option => (
            <li
              key={option.value}
              className={classNames(styles.selectControl__option, {
                [styles.selectControl__selected]: option.value === value,
              })}
              onClick={e => {
                e.stopPropagation();
                handleChange(option.value);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
