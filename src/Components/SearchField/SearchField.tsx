import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import './SearchField.scss';
import classNames from 'classnames';
import { getSearchWith } from '../../helpers/searchHelper';
import { SearchParams } from '../../types/Categories';

export const SearchField = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(SearchParams.Query) || '';
  const [isSeacrhFocused, setIsSeacrhFocused] = useState(false);
  const [inputQuery, setInputQuery] = useState(query);

  const titleField = useRef<HTMLInputElement>(null);
  const firtsRender = useRef(true);

  useEffect(() => {
    if (titleField.current && isSeacrhFocused) {
      titleField.current.focus();
    }
  }, [isSeacrhFocused]);

  useEffect(() => {
    if (firtsRender.current) {
      firtsRender.current = false;

      return;
    }

    setInputQuery('');
  }, [pathname]);

  const debouncedSearch = useCallback(debounce((newQuery: string) => {
    setSearchParams(
      getSearchWith({ [SearchParams.Query]: newQuery || null }, searchParams),
    );
  }, 1000), []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  const handleClearSeacrh = () => {
    setInputQuery('');
    setSearchParams(
      getSearchWith({ query: null }, searchParams),
    );
  };

  return (
    <label
      htmlFor="search"
      className={classNames('SearchField', {
        focus: isSeacrhFocused,
      })}
    >
      <input
        id="search"
        type="text"
        className={classNames('SearchField__input', {
          focus: isSeacrhFocused,
        })}
        placeholder={`Search in ${pathname.slice(1)}...`}
        ref={titleField}
        autoComplete="off"
        value={inputQuery}
        onChange={handleQueryChange}
        onBlur={() => setIsSeacrhFocused(false)}
        onFocus={() => setIsSeacrhFocused(true)}
      />

      {!inputQuery ? (
        <button
          type="button"
          className="SearchField__button"
          aria-label="search"
          onClick={() => setIsSeacrhFocused(true)}
        >
          <div className="icon icon--search" />
        </button>
      ) : (
        <button
          data-cy="searchDelete"
          type="button"
          className="SearchField__button"
          aria-label="search"
          onClick={handleClearSeacrh}
        >
          <div className="icon icon--remove" />
        </button>
      )}
    </label>
  );
};
