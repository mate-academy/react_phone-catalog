import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SortDropdown.module.scss';

import arrowBottom from '../../imgs/svg/arrow-bottom-icon.svg';

interface SortOption {
  value: string;
  label: string;
}

interface Props {
  sortOptions: SortOption[];
  sortKey: string;
}

export const SortDropdown: React.FC<Props> = ({ sortOptions, sortKey }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = searchParams.get(sortKey) || sortOptions[0].value;
  const [selected, setSelected] = useState(initialSort);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.set(sortKey, selected);

      if (sortKey === 'limit' && prevParams.get('limit') !== selected) {
        newParams.set('page', '1');
      }

      return newParams;
    });
  }, [selected, setSearchParams, sortKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={styles.dropdown__button}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {sortOptions.find(option => option.value === selected)?.label}
        <img
          className={styles.dropdown__button_img}
          src={arrowBottom}
          alt="arrow-down"
        />
      </button>

      <ul
        className={`${styles.dropdown__menu} ${
          isOpen ? styles['dropdown__menu--open'] : ''
        }`}
      >
        {sortOptions.map(option => (
          <li
            key={option.value}
            className={styles.dropdown__item}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
