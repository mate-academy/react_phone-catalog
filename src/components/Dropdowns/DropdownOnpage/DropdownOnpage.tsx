import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './DropdownOnpage.scss';
import { ItemsOnPage } from '../../../types/ItemsOnPage';
import { ArrowDownGrayImg, ArrowupGrayImg } from '../../../utils/indes';

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
        <img
          src={isActive ? ArrowupGrayImg : ArrowDownGrayImg}
          alt="Dropdown arrow"
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
