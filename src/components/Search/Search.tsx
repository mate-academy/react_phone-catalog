import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setQuery } from '../../store/slices/productsSlice';
import { normalizeUrlParams }
  from '../../helpers/funcService/normalizeUrlParams';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { CloseIcon } from '../../assets/icons/CloseIcon';
import { debounce } from '../../helpers/funcService/debounce';
import './Search.scss';

type Props = {
  validPath: string,
};

export const Search: React.FC<Props> = ({ validPath }) => {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();

  const [buttonType, setButtonType] = useState<'search' | 'close'>('search');

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const queryToUpdate = event.target.value || null;

    setSearchParams(
      normalizeUrlParams(searchParams, { query: queryToUpdate }),
    );

    if (queryToUpdate !== '') {
      setButtonType('close');
    } else if (window.innerWidth >= 1200) {
      setButtonType('search');
    }

    dispatch(setQuery(queryToUpdate || ''));
  };

  const handleClearQuery = useCallback(() => {
    if (buttonType === 'close') {
      setSearchParams(normalizeUrlParams(searchParams, { query: null }));
      dispatch(setQuery(''));

      setButtonType('search');
    } else if (inputRef.current) {
      setButtonType('close');
      inputRef.current.focus();
    }
  }, [buttonType]);

  const applyQuery = useCallback(
    debounce(dispatch, 1000),
    [],
  );

  useEffect(() => {
    applyQuery(setQuery(query));
  }, [query]);

  useEffect(() => {
    setButtonType('search');
  }, [pathname]);

  return (
    <div
      className={cn(
        'search__query-input__box',
        {
          'search__query-input__box--active': buttonType === 'close',
        },
      )}
    >
      <input
        type="text"
        className="search__query-input"
        placeholder={`Search in ${validPath} ...`}
        onChange={handleSearchQueryChange}
        value={query}
        ref={inputRef}
      />

      <button
        type="button"
        className="search__query-input__icon"
        onClick={handleClearQuery}
        data-cy="searchDelete"
      >
        {buttonType === 'search' ? <SearchIcon /> : <CloseIcon />}
      </button>
    </div>
  );
};
