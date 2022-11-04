import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsContext } from '../../ProductsContext';
import { itemsInSelect } from '../../utils/itemsInSelect';
import { SearchLink } from '../SearchLink';

export const ItemsPerPageMenu: React.FC = () => {
  const { phones } = useContext(ProductsContext);
  const [searchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || phones.length;
  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  const itemsPerPageMenuWidth = '13vmax';

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
      <div className="dropdown is-active">
        <div className="dropdown-trigger">
          <button
            type="button"
            style={{ width: itemsPerPageMenuWidth }}
            className="button is-flex is-justify-content-space-between"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={() => {
              setDropdownIsActive(!dropdownIsActive);
            }}
          >
            <span className="has-text-weight-semibold">
              {+perPage === phones.length ? 'All' : perPage}
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
                params={{ perPage: phones.length.toString(), page: '1' }}
                onClick={() => {
                  setDropdownIsActive(!dropdownIsActive);
                }}
              >
                All
              </SearchLink>
              {itemsInSelect.map(item => (
                <SearchLink
                  className="dropdown-item has-text-weight-semibold"
                  key={item}
                  params={{ perPage: item, page: '1' }}
                  onClick={() => {
                    setDropdownIsActive(!dropdownIsActive);
                  }}
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
