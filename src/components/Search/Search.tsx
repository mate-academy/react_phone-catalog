/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import './Search.scss';
import { getSearchWith } from '../../helpers/helper';

export const Search = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
    setSearchParams(getSearchWith(
      searchParams, { query: searchParams.get('query') || null },
    ));
  }, [pathname]);

  const applyQuery = useCallback(debounce(setSearchParams, 1000), [pathname]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    if (!newQuery) {
      setQuery('');
      applyQuery(getSearchWith(
        searchParams, { query: null },
      ));

      return;
    }

    setQuery(newQuery);
    applyQuery(getSearchWith(
      searchParams, { query: newQuery },
    ));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (event.relatedTarget && event.relatedTarget.id === 'button') {
      // eslint-disable-next-line no-useless-return
      return;
    }
  };

  const handleClickButton = () => {
    if (query) {
      setQuery('');
      setSearchParams(getSearchWith(
        searchParams, { query: null },
      ));

      return;
    }

    inputRef.current?.focus();
  };

  return (
    <div
      className={classNames(
        'search',
        { 'search--focus': !!query },
      )}
    >
      <input
        ref={inputRef}
        value={query}
        type="text"
        className="search__input"
        placeholder={`Search in ${pathname.slice(1)}...`}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        type="button"
        id="button"
        className={classNames(
          'search__button', { 'search__button--focus': !!query },
        )}
        onClick={handleClickButton}
      />
    </div>
  );
};
