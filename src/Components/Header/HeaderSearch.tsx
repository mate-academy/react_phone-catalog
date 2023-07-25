/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import './HeaderSearch.scss';
import iconSearch from './HeaderImage/Search.svg';
import iconClose from './HeaderImage/Close.svg';

interface HeaderSearchProps {
  search: string;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}

export const HeaderSearch = (
  { search, searchValue, setSearchValue }: HeaderSearchProps,
): JSX.Element => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleIconClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent> |
    React.KeyboardEvent<HTMLImageElement>,
  ) => {
    event.preventDefault();
    handleClearSearch();
  };

  return (
    <div className="header__LastChild-search-toggle">
      <input
        type="text"
        className="search-input"
        placeholder={search}
        value={searchValue}
        onChange={handleSearchChange}
      />
      {searchValue ? (
        <img
          data-cy="searchDelete"
          src={iconClose}
          alt="Close"
          className="search-icon"
          onClick={handleIconClick}
          onKeyDown={handleIconClick}
          role="button"
          tabIndex={0}
        />
      ) : (
        <img src={iconSearch} alt="Search" className="search-icon" />
      )}
    </div>
  );
};
