import { useEffect, useRef, useState } from 'react';
import styles from './DropDownMenu.module.scss';

import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import classNames from 'classnames';
import { FilteredStatus } from '../../types/filters';
import { PaginationStatus } from '../../types/pagination';

const optionsPagination = [
  { value: 'all', label: 'All' },
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
] as const;

const optionsFilter = [
  { value: 'age', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
] as const;

type Props = {
  value: FilteredStatus | PaginationStatus;
  onChange: (args: FilteredStatus | PaginationStatus) => void;
  type: 'filter' | 'pagination';
};

export const DropDownMenu: React.FC<Props> = ({ value, onChange, type }) => {
  const [isActive, setIsActive] = useState(false);
  const options = type === 'filter' ? optionsFilter : optionsPagination;
  const selectedOption = options.find(opt => opt.value === value);
  const dropDown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      if (
        dropDown.current &&
        !dropDown.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClose);

    return () => {
      document.removeEventListener('mousedown', handleClose);
    };
  }, []);

  const handleChange = (selected: { value: string; label: string }) => {
    if (selected) {
      if (type === 'filter') {
        onChange(selected.value as FilteredStatus);
      } else {
        onChange(selected.value as PaginationStatus);

      }
    }
  };

  return (
    <>
      <div className={styles.dropDown} ref={dropDown}>
        <p className={styles.dropDown__label}>
          {type === 'filter' ? 'Sort by' : 'Items per page'}
        </p>
        <div
          id="selectedLabel"
          className={styles.dropDown__title}
          onClick={() => {
            setIsActive(prev => !prev);
          }}
        >
          <span className={styles.dropDown__select}>
            {selectedOption?.label || 'none'}
          </span>
          {!isActive ? (
            <IoIosArrowDown className={styles.dropDown__arrow} />
          ) : (
            <IoIosArrowUp className={styles.dropDown__arrow} />
          )}
        </div>
        {isActive && (
          <ul className={styles.dropDown__list}>
            {options.map(opt => (
              <li
                key={opt.value}
                className={classNames(styles.dropDown__item, {
                  [styles['dropDown__item--focused']]: opt.value === value,
                })}
                onClick={() => {
                  handleChange(opt);
                  setIsActive(false);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
