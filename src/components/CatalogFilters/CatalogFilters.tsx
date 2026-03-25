import { useState, useRef, useEffect } from 'react';
import './CatalogFilters.scss';

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
      // Перевіряємо, чи клік був ПОЗА сортуванням
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
      // Перевіряємо, чи клік був ПОЗА пагінацією
      if (perPageRef.current && !perPageRef.current.contains(event.target as Node)) {
        setIsPerPageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="catalog-filters">
      {/* SORT BY */}
      <div className="filter custom-dropdown" ref={sortRef}>
        <span className="filter__label">Sort by</span>
        <div className="filter__control">
          <button
            type="button"
            className={`dropdown-toggle ${isSortOpen ? 'active' : ''}`}
            onClick={() => {
              setIsSortOpen(!isSortOpen);
              setIsPerPageOpen(false);
            }}
          >
            {sortOptions.find(o => o.value === sort)?.label || 'Newest'}
            <div className={`filter__arrow ${isSortOpen ? 'active' : ''}`} />
          </button>

          {isSortOpen && (
            <div className="dropdown-menu">
              {sortOptions.map(option => (
                <div
                  key={option.value}
                  className={`dropdown-item ${sort === option.value ? 'selected' : ''}`}
                  // ВАЖЛИВО: Використовуємо onMouseDown + stopPropagation
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
      <div className="filter custom-dropdown" ref={perPageRef}>
        <span className="filter__label">Items on page</span>
        <div className="filter__control">
          <button
            type="button"
            className={`dropdown-toggle ${isPerPageOpen ? 'active' : ''}`}
            onClick={() => {
              setIsPerPageOpen(!isPerPageOpen);
              setIsSortOpen(false);
            }}
          >
            {perPage === 'all' ? 'All' : perPage}
            <div className={`filter__arrow ${isPerPageOpen ? 'active' : ''}`} />
          </button>

          {isPerPageOpen && (
            <div className="dropdown-menu">
              {perPageOptions.map(option => (
                <div
                  key={option.value}
                  className={`dropdown-item ${perPage === option.value ? 'selected' : ''}`}
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
