import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './index.scss';
import { Sorting } from '../../types/Sorting';
import { ICONS } from '../../images';

export const SortingDropdown = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort =
    Sorting[searchParams.get('sort') as keyof typeof Sorting] || Sorting.age;
  const [selectedItem, setSelectedItem] = useState(sort);

  const itemsKeys = Object.keys(Sorting);

  const selectItem = (item: keyof typeof Sorting) => {
    setIsActive(false);
    setSelectedItem(Sorting[item]);

    searchParams.set('sort', item);
    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown">
      <p className="dropdown__label">Sort by</p>

      <div>
        <button
          type="button"
          className="dropdown__button"
          onClick={() => setIsActive(!isActive)}
        >
          {selectedItem}
          <img
            src={isActive ? ICONS.arrowUpDisabled : ICONS.arrowDownDisabled}
            alt="Arrow"
          />
        </button>
      </div>

      {isActive && (
        <div className="dropdown__content">
          {itemsKeys.map(item => (
            <button
              type="button"
              className="dropdown__content__option"
              onClick={() => selectItem(item as keyof typeof Sorting)}
              key={item}
            >
              {Sorting[item as keyof typeof Sorting]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
