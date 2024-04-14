import { useState } from 'react';
import './Dropdown.scss';
import { useSearchParams } from 'react-router-dom';
import { ItemsPerPage } from '../../types/itemsPerPage';
import { ICONS } from '../../images/icons/Icons';

export const DropdownItemOnPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('perPage') || ItemsPerPage.eight;
  const [selected, setSelected] = useState(sort);

  const itemsValues = Object.values(ItemsPerPage);

  const selectItem = (item: ItemsPerPage) => {
    setIsActive(false);
    setSelected(item);

    searchParams.set('perPage', item);
    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown">
      <p className="dropdown__text">Items on page</p>

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
          {itemsValues.map(item => (
            <button
              type="button"
              key={item}
              className="dropdown__content--button"
              onClick={() => selectItem(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
