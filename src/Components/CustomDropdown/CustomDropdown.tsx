import { useState, useRef, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import styles from './CustomDropdown.module.scss';
import { arrowDown } from '../../icons';
import { ItemsPerPageType, SortBy } from '../features/catalog';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type Props = {
  label: string;
  type: 'sortBy' | 'itemsPerPage';
};

export const CustomDropdown: React.FC<Props> = ({ label, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const itemsPerPageOptions: ItemsPerPageType[] = [4, 8, 16, 'All'];
  const options =
    type === 'sortBy' ? Object.values(SortBy) : itemsPerPageOptions;

  const selected = useMemo(() => {
    const current = new URLSearchParams(location.search);

    return type === 'sortBy'
      ? current.get('sort') || SortBy.Newest
      : current.get('perPage') || 'All';
  }, [location.search, type]);

  const handleSelect = (option: string | number) => {
    const params = new URLSearchParams(searchParams);

    if (type === 'sortBy') {
      params.set('sort', `${option}`);
      params.delete('page');
    } else {
      params.set('perPage', option === 'All' ? 'All' : `${option}`);
      params.delete('page');
    }

    navigate(`?${params.toString()}`, { replace: false });
    setIsOpen(false);
  };

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
                [styles.active]: option.toString() === selected,
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
