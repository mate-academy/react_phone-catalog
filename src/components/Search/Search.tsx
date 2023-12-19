import { useLocation, useSearchParams } from 'react-router-dom';
import './Search.scss';
import searchIcon from '../../img/icon/search.png';

export const Search: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  return (
    <div className="search">
      <label className="search__container">
        <input
          type="search"
          className="search__input"
          placeholder={`Search in ${location.pathname.slice(1)}`}
          value={query}
          onChange={handleQueryChange}
        />
        {!query.length && (
          <img
            className="search__icon"
            src={searchIcon}
            alt="search"
          />
        )}
      </label>
    </div>
  );
};
