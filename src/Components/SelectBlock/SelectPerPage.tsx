import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ItemsPerPage } from '../../types/ItemsPerPage';

import './SelectBlock.scss';

export const SelectPerPage = () => {
  const selectRef = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || ItemsPerPage.eight;
  const [selectedItem, setSelectedItem] = useState(perPage);

  const itemsValues = Object.values(ItemsPerPage);

  const selectItem = (item: ItemsPerPage) => {
    setIsActive(false);
    setSelectedItem(item);

    searchParams.set('perPage', item);
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
    <div className="select-per-page" ref={selectRef}>
      <p className="select__title">Items on page</p>

      <button
        type="button"
        className="select__button select__button-main"
        onClick={() => setIsActive(!isActive)}
      >
        {selectedItem}
      </button>

      {isActive && (
        <div className="select__options-block">
          {itemsValues.map(option => (
            <button
              key={option}
              type="button"
              className="select__button"
              onClick={() => selectItem(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
