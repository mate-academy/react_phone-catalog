import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import './Search.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../../Helpers/SearchContext';

export const Search: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [placeholder, setPlaceholder] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isFavPage = location.pathname === '/favourites';
  const isPhonePage = location.pathname === '/phones';
  const isTabletPage = location.pathname === '/tablets';
  const isAccessoriesPage = location.pathname === '/accessories';

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryParam = queryParams.get('query') || '';

    setSearchQuery(queryParam);

    switch (true) {
      case isFavPage:
        setPlaceholder('Search in favorites');
        break;
      case isPhonePage:
        setPlaceholder('Search in phones');
        break;
      case isTabletPage:
        setPlaceholder('Search in tablets');
        break;
      case isAccessoriesPage:
        setPlaceholder('Search in accessories');
        break;
      default:
        setPlaceholder('Search in products');
        break;
    }
  }, [
    isFavPage,
    isPhonePage,
    isTabletPage,
    isAccessoriesPage,
    location.search,
    setSearchQuery,
  ]);

  const debouncedSetSearchQuery = debounce((value) => {
    setSearchQuery(value);

    const queryParams = new URLSearchParams(location.search);

    queryParams.set('query', value);
    navigate(`?${queryParams.toString()}`);
  });

  const handleSearchInputChange
    = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      debouncedSetSearchQuery(value);
    };

  const handleClearClick = () => {
    setSearchQuery('');

    const queryParams = new URLSearchParams(location.search);

    queryParams.delete('query');
    navigate(`?${queryParams.toString()}`);
  };

  const handleClearKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === 'Space') {
      setSearchQuery('');
      const queryParams = new URLSearchParams(location.search);

      queryParams.delete('query');
      navigate(`?${queryParams.toString()}`);
    }
  };

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchInputChange}
      />

      {searchQuery ? (
        <button
          type="button"
          onClick={handleClearClick}
          onKeyDown={handleClearKeyDown}
          className="search__icon search__icon--close"
          data-cy="searchDelete"
        >
          <img
            src="images/Close.svg"
            alt="Delete the item"
          />
        </button>
      ) : (
        <button
          type="button"
          className="search__icon search__icon--search"
        >
          <img
            src="images/Search.svg"
            alt="Find the item"
          />
        </button>
      )}
    </div>
  );
};
