import { useState } from 'react';
import './Filter.scss';
import { useSearchParams } from 'react-router-dom';

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'newest', label: 'Newest' },
  { value: 'cheapest', label: 'Cheapest' },
  { value: 'most_capacity', label: 'Most capacity' },
];
const ITEMS_IN_PAGE = [
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: '32', label: '32' },
  { value: '64', label: '64' },
];

export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCountItem, setIsOpenCountItem] = useState(false);

  const sortParam = searchParams.get('sort') || '';
  const itemsInPageParam = searchParams.get('items') || '16';

  const handleChange = (value: string) => {
    if (value === '') {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', value);
    }

    setSearchParams(searchParams);
    setIsOpen(false);
  };

  const handleChangeItemInPage = (value: string) => {
    if (value === '16') {
      searchParams.delete('items');
    } else {
      searchParams.set('items', value);
    }

    setSearchParams(searchParams);
    setIsOpenCountItem(false);
  };

  const currentLabelForCountItem =
    ITEMS_IN_PAGE.find(option => option.value === itemsInPageParam)?.label ||
    '16';

  const currentLabel =
    SORT_OPTIONS.find(option => option.value === sortParam)?.label || 'Default';

  return (
    <div className="filter-container">
      <div className="sort-box">
        <span className="text-sort_by">Sort by</span>
        <div className="custom-dropdown">
          <button
            className={`dropdown-toggle ${isOpen ? 'focused' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {currentLabel}
            <img
              src="public/imgForProject/icon/Arrow_down.png"
              alt="ArrowDown"
              className={`arrow ${isOpen ? 'open' : ''}`}
            />
          </button>

          {isOpen && (
            <ul className="dropdown-menu">
              {SORT_OPTIONS.map(option => (
                <li
                  key={option.value}
                  className={`dropdown-item ${
                    sortParam === option.value ? 'selected' : ''
                  }`}
                  onClick={() => handleChange(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="items-in-page__box">
        <span className="text-sort_by">Items on page</span>
        <div className="custom-dropdown">
          <button
            className={`dropdown-toggle toggle__item-in-page ${isOpenCountItem ? 'focused' : ''}`}
            onClick={() => setIsOpenCountItem(!isOpenCountItem)}
          >
            {currentLabelForCountItem}
            <img
              src="public/imgForProject/icon/Arrow_down.png"
              alt="ArrowDown"
              className={`arrow ${isOpenCountItem ? 'open' : ''}`}
            />
          </button>

          {isOpenCountItem && (
            <ul className="dropdown-menu dropdown-menu-left">
              {ITEMS_IN_PAGE.map(option => (
                <li
                  key={option.value}
                  className={`dropdown-item ${
                    sortParam === option.value ? 'selected' : ''
                  }`}
                  onClick={() => handleChangeItemInPage(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
