import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UseClickOutside } from '../../hooks/UseClickOutside';
import { itemsInSelect } from '../../utils/itemsInSelect';
import { SearchLink } from '../SearchLink';

type Props = {
  totaItems: number
};

export const ItemsPerPageMenu: React.FC<Props> = ({ totaItems }) => {
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || totaItems;
  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  const itemsPerPageMenuWidth = '13vmax';
  const dropdownHandler = () => setDropdownIsActive(!dropdownIsActive);

  const menuRef = UseClickOutside(() => {
    setDropdownIsActive(false);
  });

  return (
    <div>
      <p className="
        has-text-grey-light
        is-size-7
        has-text-weight-bold
        mb-1"
      >
        Items Per Page
      </p>
      <div ref={menuRef} className="dropdown is-active">
        <div className="dropdown-trigger">
          <button
            type="button"
            style={{ width: itemsPerPageMenuWidth }}
            className="button is-flex is-justify-content-space-between"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={dropdownHandler}
          >
            <span className="has-text-weight-semibold">
              {+perPage === totaItems ? 'All' : perPage}
            </span>
            <span className="icon is-small">
              <i
                className="fas fa-angle-down has-text-grey-light"
                aria-hidden="true"
              />
            </span>
          </button>
        </div>

        {dropdownIsActive && (
          <div
            className="dropdown-menu"
            id="dropdown-menu"
            role="menu"
          >
            <div
              style={{ width: itemsPerPageMenuWidth }}
              className="dropdown-content"
            >
              <SearchLink
                className="dropdown-item has-text-weight-semibold"
                params={{ perPage: totaItems.toString(), page: '1' }}
                onClick={dropdownHandler}
              >
                All
              </SearchLink>
              {itemsInSelect.map(item => (
                <SearchLink
                  className="dropdown-item has-text-weight-semibold"
                  key={item}
                  params={{ perPage: item, page: '1' }}
                  onClick={dropdownHandler}
                >
                  {item}
                </SearchLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
