import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './DropdownOnpage.scss';
import { ItemsOnPage } from '../../../shared/types/ItemsOnPage';
import classNames from 'classnames';

const DropdownOnpage = () => {
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
      <p className="dropdown__text">Items on page</p>

      <button
        type="button"
        className="dropdown__button"
        onClick={() => setIsActive(!isActive)}
      >
        {selectedItem}
        <div
          className={classNames('icon', {
            'icon--arrow-up': isActive,
            'icon--arrow-down': !isActive,
          })}
        />
      </button>

      {isActive && (
        <div className="dropdown__content">
          {itemsValues.map(item => (
            <button
              type="button"
              key={item}
              className="dropdown__content-button"
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

export default DropdownOnpage;
