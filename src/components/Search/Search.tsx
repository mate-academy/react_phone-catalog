import './search.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/searchHelper';
import closeIcon from '../../Images/Icons/Close.svg';
import searchIcon from '../../Images/Icons/Search.svg';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { pathname } = location;
  const searchField = pathname.slice(1);

  const query = searchParams.get('query') || '';
  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams,
      { query: event.target.value || null }));
  };

  const isClearSearch = () => {
    setSearchParams('');
  };

  return (
    <div className="search">
      <label htmlFor="" className="search__label">
        <input
          type="text"
          className="search__input"
          value={query}
          placeholder={`Search in ${searchField}...`}
          onChange={onQueryChange}
        />
      </label>

      <button
        type="button"
        className="search__button"
        onClick={isClearSearch}
        data-cy="searchDelete"
      >
        {query ? (
          <img src={closeIcon} alt={closeIcon} />
        ) : (
          <img src={searchIcon} alt={searchIcon} />
        )}
      </button>
    </div>
  );
};
