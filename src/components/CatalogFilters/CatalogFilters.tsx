import { useState } from 'react';
import './CatalogFilters.scss';

interface CatalogFiltersProps {
  sort: string;
  perPage: number | 'all';
  onSortChange: (value: string) => void;
  onPerPageChange: (value: number | 'all') => void;
}

const CatalogFilters = ({
  sort,
  perPage,
  onSortChange,
  onPerPageChange,
}: CatalogFiltersProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);

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

  const getSortLabel = (value: string) =>
    sortOptions.find(opt => opt.value === value)?.label || 'Newest';

  const getPerPageLabel = (value: number | 'all') =>
    perPageOptions.find(opt => opt.value === value)?.label || '8';

  return (
    <div className="catalog-filters">
      {/* Кастомний Sort dropdown */}
      <div className="filter custom-dropdown">
        <label className="filter__label">Sort by</label>
        <div className="filter__control">
          <button
            className="dropdown-toggle"
            onClick={() => setIsSortOpen(!isSortOpen)}
            onBlur={() => setTimeout(() => setIsSortOpen(false), 200)}
          >
            <span>{getSortLabel(sort)}</span>
            <div className="filter__arrow" />
          </button>

          {isSortOpen && (
            <div className="dropdown-menu">
              {sortOptions.map(option => (
                <div
                  key={option.value}
                  className={`dropdown-item ${sort === option.value ? 'selected' : ''}`}
                  onClick={() => {
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

      {/* Кастомний Items per page dropdown */}
      <div className="filter custom-dropdown">
        <label className="filter__label">Items on page</label>
        <div className="filter__control">
          <button
            className="dropdown-toggle"
            onClick={() => setIsPerPageOpen(!isPerPageOpen)}
            onBlur={() => setTimeout(() => setIsPerPageOpen(false), 200)}
          >
            <span>{getPerPageLabel(perPage)}</span>
            <div className="filter__arrow" />
          </button>

          {isPerPageOpen && (
            <div className="dropdown-menu">
              {perPageOptions.map(option => (
                <div
                  key={option.value}
                  className={`dropdown-item ${perPage === option.value ? 'selected' : ''}`}
                  onClick={() => {
                    onPerPageChange(option.value);
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
