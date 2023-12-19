import {
  memo, useCallback, useEffect, useState,
} from 'react';
import './Search.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { getSearchWith } from '../../helpers/serchWith';

type DebouncedFunction<T> = ((...args: []) => T) & {
  cancel: () => void;
  flush: () => void;
};

export const Search = memo(() => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = pathname.substring(1);
  const [input, setInput] = useState<string>('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const queryDebounce: DebouncedFunction<void> = useCallback(
    debounce(() => {
      setSearchParams(getSearchWith(searchParams, { query: input }));
    }, 300), [input, searchParams, setSearchParams],
  );

  useEffect(() => {
    queryDebounce();

    return () => queryDebounce.cancel();
  }, [input, queryDebounce]);

  const clearQuery = () => {
    setInput('');
    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  return (
    <div className="search">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="search__input"
        placeholder={` search in ${location}...`}
      />
      {input.length ? (
        <button
          type="button"
          className="search__button"
          aria-label="button"
          onClick={clearQuery}
        >
          <img src="img/mine/icons/Close.svg" alt="" />
        </button>
      ) : (
        <button
          type="button"
          className="search__button"
          disabled
          aria-label="button"
        >
          <img src="img/mine/icons/Search.svg" alt="" />
        </button>
      )}
    </div>
  );
});
