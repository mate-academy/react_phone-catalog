import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ItemsOnPage } from '../../types/ItemsOnPage';
import { ICONS } from '../../images/icons/icons';
import './Dropdowns.scss';

export const DropdownItemsOnPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('perPage') || ItemsOnPage.eight;
  const [selectedItem, setSelectedItem] = useState(sort);

  const itemsValues = Object.values(ItemsOnPage);

  const selectItem = (item: ItemsOnPage) => {
    setIsActive(false);
    setSelectedItem(item);

    searchParams.set('perPage', item);
    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown">
      <p className="dropdown__text">
        Items on page
      </p>

      <div>
        <button
          type="button"
          className="dropdown__button"
          onClick={() => setIsActive(!isActive)}
        >
          {selectedItem}
          <img
            src={isActive
              ? ICONS.arrowUpDisabled
              : ICONS.arrowDownDisabled}
            alt="Dropdown arrow"
          />
        </button>
      </div>

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
