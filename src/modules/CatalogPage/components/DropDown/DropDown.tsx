import React, { useState, useRef, useEffect } from 'react';
import cl from 'classnames';

import { ArrowUpIcon } from '../../../../components/Icons/ArrowUpIcon';

import styles from './DropDown.module.scss';

type Props = {
  label: string;
  options: string[];
  selectedValue: string;
  className: string;
  onSelect: (value: string) => void;
};

const SORT_NAME: Record<string, string> = {
  age: 'Newest',
  price: 'Cheapest',
  title: 'Alphabetically',
  '4': '4',
  '8': '8',
  '16': '16',
  all: 'all',
};

export const Dropdown: React.FC<Props> = ({
  label,
  options,
  selectedValue,
  className,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cl(styles.filterGroup, className)} ref={dropdownRef}>
      <p className={styles.label}>{label}</p>

      <div className={styles.customSelect} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.selectedValue}>
          {SORT_NAME[selectedValue] || selectedValue}

          <span className={cl(styles.arrow, { [styles.arrowDown]: !isOpen })}>
            <ArrowUpIcon />
          </span>
        </div>

        {isOpen && (
          <ul className={styles.optionsList}>
            {options.map(option => (
              <li
                key={option}
                className={cl(styles.optionItem, {
                  [styles.optionItemActive]: option === selectedValue,
                })}
                onClick={e => {
                  e.stopPropagation();

                  if (option !== selectedValue) {
                    onSelect(option);
                  }

                  setIsOpen(false);
                }}
              >
                {SORT_NAME[option]}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
