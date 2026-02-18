import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Search.scss';
type SearchType = {
  formState: boolean;
  searchString: string;
  searchState: boolean;
  visibilityState: boolean;
  onSearch: (value: string) => void;
  onShowSearch: (value: boolean) => void;
};
export const Search = ({
  formState,
  searchString,
  searchState,
  visibilityState,
  onSearch,
  onShowSearch,
}: SearchType) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    onSearch(value);
  };

  const handleIconSearch = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    onShowSearch(true);
  };

  return (
    <>
      {formState && (
        <form
          action="#"
          onSubmit={e => e.preventDefault()}
          className="header-desktop-navigation-form"
        >
          <input
            name="search"
            type="text"
            value={searchString}
            onChange={e => handleSearch(e)}
            className="header-desktop-navigation-form-input"
          />
          <span
            className="header-desktop-right-side-clear-search"
            onClick={() => {
              onSearch('');
              onShowSearch(false);
            }}
          >
            x
          </span>
        </form>
      )}
      <div
        className={classNames('search-visibility', {
          'search-visibility-state': visibilityState,
        })}
      >
        <NavLink
          to={'/cart'}
          className={classNames(
            'header-desktop-right-side-cart-link search-link',
            {
              'hide-search-icon': searchState,
            },
          )}
          onClick={e => handleIconSearch(e)}
        >
          <img src="img/shared/search.svg" alt="" />
        </NavLink>
      </div>
    </>
  );
};
