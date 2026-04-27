import { useState, useRef, useEffect } from 'react';
import s from './CatalogFilters.module.scss';

interface CatalogFiltersProps {
  sort: string;
  perPage: number | 'all';
  onSortChange: (value: string) => void;
  onPerPageChange: (value: number | 'all') => void;
}

const CatalogFilters = ({ sort, perPage, onSortChange, onPerPageChange }: CatalogFiltersProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const perPageRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'alphabet', label: 'Alphabetically' },
    { value: 'cheapest', label: 'Cheapest' },
    { value: 'expensive', label: 'Most expensive' },
  ];

  const perPageOptions = [
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 16, label: '16' },
    { value: 'all', label: 'All' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      if (perPageRef.current && !perPageRef.current.contains(event.target as Node)) {
        setIsPerPageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={s.catalogFilters}>
      {/* SORT BY */}
      <div className={`${s.filter} ${s.customDropdown}`} ref={sortRef}>
        <span className={s.filterLabel}>Sort by</span>
        <div className={s.filterControl}>
          <button
            type="button"
            className={`${s.dropdownToggle} ${isSortOpen ? s.active : ''}`}
            onClick={() => {
              setIsSortOpen(!isSortOpen);
              setIsPerPageOpen(false);
            }}
          >
            {sortOptions.find(o => o.value === sort)?.label || 'Newest'}
            <div className={`${s.filterArrow} ${isSortOpen ? s.active : ''}`} />
          </button>

          {isSortOpen && (
            <div className={s.dropdownMenu}>
              {sortOptions.map(option => (
                <div
                  key={option.value}
                  className={`${s.dropdownItem} ${sort === option.value ? s.selected : ''}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSortChange(option.value);
                    setIsSortOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ITEMS ON PAGE */}
      <div className={`${s.filter} ${s.customDropdown}`} ref={perPageRef}>
        <span className={s.filterLabel}>Items on page</span>
        <div className={s.filterControl}>
          <button
            type="button"
            className={`${s.dropdownToggle} ${isPerPageOpen ? s.active : ''}`}
            onClick={() => {
              setIsPerPageOpen(!isPerPageOpen);
              setIsSortOpen(false);
            }}
          >
            {perPage === 'all' ? 'All' : perPage}
            <div className={`${s.filterArrow} ${isPerPageOpen ? s.active : ''}`} />
          </button>

          {isPerPageOpen && (
            <div className={s.dropdownMenu}>
              {perPageOptions.map(option => (
                <div
                  key={option.value}
                  className={`${s.dropdownItem} ${perPage === option.value ? s.selected : ''}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onPerPageChange(option.value as number | 'all');
                    setIsPerPageOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogFilters;
