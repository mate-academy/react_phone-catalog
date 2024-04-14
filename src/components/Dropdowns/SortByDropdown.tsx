import { useState } from 'react';
import './Dropdown.scss';
import { useSearchParams } from 'react-router-dom';
import { ICONS } from '../../images/icons/Icons';
import { SortBy } from '../../types/sortBy';

export const SortByDropdown = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort =
    SortBy[searchParams.get('sort') as keyof typeof SortBy] || SortBy.age;
  const [selected, setSelected] = useState(sort);

  const itemsKeys = Object.keys(SortBy);

  const selectItem = (item: keyof typeof SortBy) => {
    setIsActive(false);
    setSelected(SortBy[item]);

    searchParams.set('sort', item);
    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown">
      <p className="dropdown__text">Sort by</p>

      <button
        type="button"
        className="dropdown__button"
        onClick={() => setIsActive(!isActive)}
      >
        {selected}
        <img
          src={isActive ? ICONS.arrowUpDisabled : ICONS.arrowDownDisabled}
          alt="Dropdown arrow"
        />
      </button>

      {isActive && (
        <div className="dropdown__content">
          {itemsKeys.map(item => (
            <button
              type="button"
              key={item}
              className="dropdown__content--button"
              onClick={() => selectItem(item as keyof typeof SortBy)}
            >
              {SortBy[item as keyof typeof SortBy]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
