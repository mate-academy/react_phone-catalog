import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const SelectSortBy = ({}) => {
  const [isActive, setIsActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [, setSortBy] = useState('Newest');

  const sort: string | null = searchParams.get('sort');
  const normalizedSort = sort?.charAt(0).toUpperCase() + sort?.slice(1);

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }

    params.delete('page');

    setSearchParams(params);
  };

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="select" ref={selectRef}>
      <div className="select__content">
        <div
          className={
            !isActive
              ? 'select__header'
              : 'select__header select__header--active'
          }
          onClick={() => setIsActive(!isActive)}
        >
          <div className="select__value">{normalizedSort || 'Newest'}</div>
          <div
            className={`select__icon icon--arrow-down ${isActive ? 'select__icon--rotate' : ''}`}
          />
        </div>

        {isActive && (
          <div className="select__active-bar">
            <div className="select__active-bar-content">
              <div
                className="select__active-bar-option text-body"
                onClick={() => {
                  handleSort('newest');
                  setIsActive(false);
                  setSortBy('Newest');
                }}
              >
                Newest
              </div>
              <div
                className="select__active-bar-option text-body"
                onClick={() => {
                  handleSort('alphabetically');
                  setIsActive(false);
                  setSortBy('Alphabetically');
                }}
              >
                Alphabetically
              </div>
              <div
                className="select__active-bar-option text-body"
                onClick={() => {
                  handleSort('cheapest');
                  setIsActive(false);
                  setSortBy('Cheapest');
                }}
              >
                Cheapest
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectSortBy;
