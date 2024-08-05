import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../../types/SortBy';

import './SelectBlock.scss';

export const SelectByType = () => {
  const selectRef = useRef<HTMLDivElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort =
    SortBy[searchParams.get('sort') as keyof typeof SortBy] || SortBy.age;

  const [isActive, setIsActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(sort);

  const itemsKeys = Object.keys(SortBy);

  const selectItem = (item: keyof typeof SortBy) => {
    setIsActive(false);
    setSelectedItem(SortBy[item]);

    searchParams.set('sort', item);
    setSearchParams(searchParams);
  };

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
    <div className="select-sort-by" ref={selectRef}>
      <p className="select__title">Sort by</p>

      <button
        type="button"
        className="select__button select__button-main"
        onClick={() => setIsActive(!isActive)}
      >
        {selectedItem}
      </button>

      {isActive && (
        <div className="select__options-block">
          {itemsKeys.map(option => (
            <button
              key={option}
              type="button"
              className="select__button"
              onClick={() => selectItem(option as keyof typeof SortBy)}
            >
              {SortBy[option as keyof typeof SortBy]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
