import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../../types/SortBy';
import { ICONS } from '../../images/icons/icons';
import './Dropdowns.scss';

export const SortByDropdown = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = SortBy[searchParams
    .get('sort') as keyof typeof SortBy] || SortBy.age;
  const [selectedItem, setSelectedItem] = useState(sort);

  const itemsKeys = Object.keys(SortBy);

  const selectItem = (item: keyof typeof SortBy) => {
    setIsActive(false);
    setSelectedItem(SortBy[item]);

    searchParams.set('sort', item);
    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown">
      <p
        className="dropdown__text"
      >
        Sort by
      </p>

      <div>
        <button
          type="button"
          className="dropdown__button"
          onClick={() => setIsActive(!isActive)}
        >
          {selectedItem}
          <img
            src={
              isActive
                ? ICONS.arrowUpDisabled
                : ICONS.arrowDownDisabled
            }
            alt="Dropdown arrow"
          />
        </button>
      </div>

      {isActive && (
        <div className="dropdown__content">
          {
            itemsKeys.map(item => (
              <button
                key={item}
                type="button"
                className="dropdown__content--button"
                onClick={() => selectItem(item as keyof typeof SortBy)}
              >
                {SortBy[item as keyof typeof SortBy]}
              </button>
            ))
          }
        </div>
      )}
    </div>
  );
};
