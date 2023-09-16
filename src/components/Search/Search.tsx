import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import './style.scss';
import { SearchParams, getSearchWith } from '../../utils/searchHelper';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputQuery, setInputQuery] = useState('');
  const delay = 1000;
  const searchLocation = useLocation().pathname.replace(/[^a-zA-Z0-9]/g, '');

  useEffect(() => {
    setInputQuery(searchParams.get('query') || '');
  }, []);

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const applyQuery = debounce((query: string) => {
    setSearchWith({ query: query || null });
  }, delay);

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setInputQuery(value);
    applyQuery(value);
  }

  function handleClose() {
    setInputQuery('');
    setSearchWith({ query: null });
  }

  return (
    <label className="search">
      <input
        type="text"
        className="search__field"
        placeholder={`Search in ${searchLocation}`}
        value={inputQuery}
        onChange={handleQueryChange}
      />
      {!inputQuery ? (
        <img
          src="/icons/Search.svg"
          alt="Search"
          className="search__icon"
        />
      ) : (
        <button
          type="button"
          className="search__close"
          onClick={handleClose}
        >
          <img src="/icons/close.svg" alt="close" className="search__icon" />
        </button>
      )}
    </label>
  );
};
