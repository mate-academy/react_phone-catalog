/* eslint-disable max-len */
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Button } from '../Button/Button';
import { ButtonType } from '../../helpers/types/ButtonType';
import { getSearchWith } from '../../helpers/functionService/searchParamsHelper';
import { debounce } from '../../helpers/functionService/debounce';
import { setQuery } from '../../store/slices/productSlice';
import './Search.scss';

export const Search: React.FC = () => {
  const [buttonContent, setButtonContent] = useState(ButtonType.SEARCH);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: e.target.value || null }),
    );

    if (e.target.value !== '') {
      setButtonContent(ButtonType.CLOSE);
    } else if (window.innerWidth >= 1200) {
      setButtonContent(ButtonType.SEARCH);
    }
  };

  const handleClearQuery = useCallback(() => {
    if (buttonContent === ButtonType.CLOSE) {
      setSearchParams(getSearchWith(searchParams, { query: null }));
      setButtonContent(ButtonType.SEARCH);
    } else if (inputRef.current) {
      setButtonContent(ButtonType.CLOSE);
      inputRef.current.focus();
    }
  }, [buttonContent]);

  const applyQuery = useCallback(
    debounce(dispatch, 1000),
    [],
  );

  useEffect(() => {
    setButtonContent(ButtonType.SEARCH);
  }, [pathname]);

  useEffect(() => {
    applyQuery(setQuery(query));
  }, [query]);

  return (
    <div
      className={classNames(
        'search',
        { 'search--active': buttonContent === ButtonType.CLOSE },
      )}
    >
      <input
        type="text"
        className="search__input"
        placeholder={`Search in ${pathname.slice(1)}...`}
        value={query}
        onChange={(e) => handleQueryChange(e)}
        ref={inputRef}
      />
      <Button
        content={buttonContent}
        data-cy="searchDelete"
        className="search__icon"
        onClick={handleClearQuery}
      />
    </div>
  );
};
