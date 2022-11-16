import classNames from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UseClickOutside } from '../../hooks/UseClickOutside';
import { sortParams } from '../../utils/sortParams';
import { SearchLink } from '../SearchLink';

export const SortMenu = () => {
  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'newest';
  const menuRef = UseClickOutside(() => {
    setDropdownIsActive(false);
  });

  const sortMenuWidth = '19vmax';

  return (
    <div>
      <p className="
                has-text-grey-light
                is-size-7
                has-text-weight-bold
                mb-1"
      >
        Sort by
      </p>
      <div
        ref={menuRef}
        className={classNames('dropdown', { 'is-active': dropdownIsActive })}
      >
        <div className="dropdown-trigger">
          <button
            type="button"
            style={{ width: sortMenuWidth }}
            className="button is-flex is-justify-content-space-between"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={() => {
              setDropdownIsActive(!dropdownIsActive);
            }}
          >
            <span className="has-text-weight-semibold">
              {[sort[0].toLocaleUpperCase(),
                ...sort.split('').slice(1)]}
            </span>
            <span className="icon is-small">
              <i
                className="fas fa-angle-down has-text-grey-light"
                aria-hidden="true"
              />
            </span>
          </button>
        </div>

        <div
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
        >
          <div
            style={{ width: sortMenuWidth }}
            className="dropdown-content"
          >
            {sortParams.map(sortType => (
              <SearchLink
                className="dropdown-item has-text-weight-semibold"
                key={sortType}
                params={{ sort: sortType }}
                onClick={() => {
                  setDropdownIsActive(!dropdownIsActive);
                }}
              >
                {[sortType[0].toLocaleUpperCase(),
                  ...sortType.split('').slice(1)]}
              </SearchLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
