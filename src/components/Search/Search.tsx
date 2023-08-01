import { useLocation } from 'react-router-dom';
import search from '../../Icons/search.svg';
import cross from '../../Icons/closeBlack.svg';
import './Search.scss';
import { setQuery, setResults } from '../../features/search';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const Search: React.FC = () => {
  const searchQuery = useAppSelector((state) => state.search.query);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const showSearch
    = location.pathname === '/phones'
    || location.pathname === '/tablets'
    || location.pathname === '/accessories'
    || location.pathname === '/favourites';

  if (!showSearch) {
    return null;
  }

  let searchText = '';

  if (location.pathname === '/phones') {
    searchText = 'Search in phones...';
  } else if (location.pathname === '/tablets') {
    searchText = 'Search in tablets...';
  } else if (location.pathname === '/accessories') {
    searchText = 'Search in accessories...';
  } else if (location.pathname === '/favourites') {
    searchText = 'Search in favorites...';
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();

    dispatch(setQuery(query));
  };

  const handleClearSearch = () => {
    dispatch(setQuery(''));
    dispatch(setResults([]));
  };

  return (
    <div className="search">
      <div className="search__content">
        <input
          type="text"
          placeholder={searchText}
          className="search__input input"
          value={searchQuery}
          onChange={handleSearch}
        />

        <button
          type="button"
          className="search__button button"
          onClick={handleClearSearch}
          data-cy="searchDelete"
        >
          {searchQuery ? (
            <img src={cross} alt="cross" className="search__img" />
          ) : (
            <img src={search} alt="search" className="search__img" />
          )}
        </button>
      </div>
    </div>
  );
};
