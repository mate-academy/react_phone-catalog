import { Link } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';

import './DropDown.scss';

export const DropDown = () => {
  const [isDropDownActive, setIsDropDownActive] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropDownActive(false);
    }
  };

  return (
    <div
      className={cn('dropdown', { 'is-active': isDropDownActive })}
      onBlur={handleBlur}
    >
      <div className="dropdown__label">Sort by</div>
      <div className="dropdown__trigger">
        <button
          type="button"
          className="dropdown__button"
          onClick={() => setIsDropDownActive(!isDropDownActive)}
        >
          <span className="dropdown__title">Newest</span>
          <span>
            {/* className="ico ico-down" */}
            <i
              className={cn('ico', {
                'ico-down': !isDropDownActive,
                'ico-up': isDropDownActive,
              })}
            />
          </span>
        </button>
      </div>

      <div className="dropdown__menu">
        <Link
          to={{
            search: 'sort=age',
          }}
          className="dropdown__item"
          onClick={() => setIsDropDownActive(false)}
        >
          Newest
        </Link>
        <Link
          to={{
            search: 'sort=name',
          }}
          className="dropdown__item"
          onClick={() => setIsDropDownActive(false)}
        >
          Alphabetically
        </Link>
        <Link
          to={{
            search: 'sort=price',
          }}
          className="dropdown__item"
          onClick={() => setIsDropDownActive(false)}
        >
          Cheapest
        </Link>
      </div>
    </div>
  );
};
