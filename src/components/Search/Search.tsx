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

  switch (location.pathname) {
    case '/phones':
      searchText = 'Search in phones...';
      break;
    case '/tablets':
      searchText = 'Search in tablets...';
      break;
    case '/accessories':
      searchText = 'Search in accessories...';
      break;
    case '/favourites':
      searchText = 'Search in favorites...';
      break;
    default:
      break;
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim().toLowerCase();

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
