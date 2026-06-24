import classNames from 'classnames';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Filter, FilterValue } from '../../../types/types';
import { imageUrl } from '../../../utils/imageUrl';
import styles from './Select.module.scss';

export const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Choose one',
  title,
  hasDefaultValue,
}: Filter) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const selected = options.find(item => item.value === value);

  const handleSelect = (eventValue: FilterValue) => {
    onChange(eventValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (selectRef.current && selectRef.current.contains(e.target as Node)) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('mousedown', close);

    return () => {
      document.removeEventListener('mousedown', close);
    };
  }, []);

  return (
    <div className={styles.container} ref={selectRef}>
      {title && (
        <div className={styles.group}>
          <p className={styles.title}>{title}</p>
        </div>
      )}
      <div
        className={classNames(styles.select, {
          [styles.select__active]: isOpen,
        })}
      >
        <div
          className={styles.select__header}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected ? selected.label : placeholder}
          <img
            src={imageUrl('icons/ArrowDown.svg')}
            alt=""
            className={styles.select__icon}
          />
        </div>
        {isOpen && (
          <ul
            className={classNames(styles.list, {
              [styles.list__active]: isOpen,
            })}
          >
            {!hasDefaultValue && (
              <li
                className={styles.list__item}
                onClick={() => handleSelect(null)}
              >
                Reset
              </li>
            )}
            {options.map((item, index) => {
              return (
                <li
                  className={classNames(styles.list__item, {
                    [styles.list__item_active]: item.value === value,
                  })}
                  key={`${item.value}-${index}`}
                  onClick={() => handleSelect(item.value)}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
