import classNames from 'classnames';
import { useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/search.scss';

export const Search = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(query);

  const queryRequest = (
    selectedQuery: string,
    selectedPathname: string,
    selectedSearchParams: URLSearchParams,
  ) => {
    if (selectedQuery.trim()) {
      selectedSearchParams.set('query', selectedQuery);
    } else {
      selectedSearchParams.delete('query');
    }

    setSearchParams(selectedSearchParams);

    navigate({
      pathname: selectedPathname,
      search: selectedSearchParams.toString(),
    });
  };

  const handleQueryChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    queryRequest(event.target.value, pathname, searchParams);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={`Search in ${pathname.slice(1)}...`}
        value={searchQuery}
        className={classNames(
          'search',
          { 'search--has-text': searchQuery !== '' },
        )}
        onChange={handleQueryChange}
      />
      {
        searchQuery !== '' && (
          <button
            type="button"
            className="search__clear-button"
            onClick={() => {
              setSearchQuery('');
              queryRequest('', pathname, searchParams);
            }}
          >
            { }
          </button>
        )
      }
    </div>
  );
};
