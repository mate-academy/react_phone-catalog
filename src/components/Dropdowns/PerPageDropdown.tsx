import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './index.scss';
import { PerPage } from '../../types/PerPage';
import { ICONS } from '../../images';

export const PerPageDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get('perPage') || PerPage.eight;

  const [isActive, setIsActive] = useState(false);
  const [selectedPagination, setSelectedPagination] = useState(perPage);

  const dropdownOptions = Object.values(PerPage);

  const selectItem = (count: PerPage) => {
    setIsActive(false);
    setSelectedPagination(count);

    searchParams.set('perPage', count);
    setSearchParams(searchParams);
  };

  return (
    <div className="dropdown">
      <p className="dropdown__label">Items on page</p>

      <div>
        <button
          type="button"
          className="dropdown__button"
          onClick={() => setIsActive(!isActive)}
        >
          {selectedPagination}
          <img
            src={isActive ? ICONS.arrowUpDisabled : ICONS.arrowDownDisabled}
            alt="Arrow"
          />
        </button>
      </div>

      {isActive && (
        <div className="dropdown__content">
          {dropdownOptions.map(item => (
            <button
              type="button"
              className="dropdown__content__option"
              onClick={() => selectItem(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
