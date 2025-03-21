import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './CustomDropdown.module.scss';
import { arrowDown } from '../../icons';
import { ItemsPerPageType, SortBy } from '../features/catalog';
import { useSearchParams } from 'react-router-dom';

type Props = {
  label: string;
  type: 'sortBy' | 'itemsPerPage';
};

export const CustomDropdown: React.FC<Props> = ({ label, type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemsPerPageOptions: ItemsPerPageType[] = [4, 8, 16, 'All'];
  const [isOpen, setIsOpen] = useState(false);

  const selected =
    type === 'sortBy'
      ? searchParams.get('sort') || SortBy.Newest
      : searchParams.get('perPage') || 'All';
  const options =
    type === 'sortBy' ? Object.values(SortBy) : itemsPerPageOptions;

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

  const handleSelect = (option: string | number) => {
    const params = new URLSearchParams(searchParams);

    if (type === 'sortBy') {
      params.set('sort', `${option}`);
    } else {
      params.set('perPage', option === 'All' ? 'all' : `${option}`);
      params.set('page', '1');
    }

    setSearchParams(params);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <p className={styles.dropdownLabel}>{label}</p>
      <div
        className={classNames(styles.dropdownHeader, { [styles.open]: isOpen })}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <span className={styles.selected}>{selected}</span>
        <img
          src={arrowDown}
          alt="dropdown-arrow"
          className={styles.arrowIcon}
        />
      </div>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map(option => (
            <li
              key={option}
              className={classNames(styles.dropdownItem, {
                [styles.active]: option === selected,
              })}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
