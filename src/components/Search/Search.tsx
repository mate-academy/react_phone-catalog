import {
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Button } from '../Button';
import { ButtonType } from '../../types/ButtonType';
import { getSearchWith } from '../../utils/helpers/searchParamsHelper';
import { setQuery } from '../../store/slices/productsSlice';
import { useAppDispatch } from '../../utils/hooks/hooks';
import { debounce } from '../../utils/helpers/debounce';
import './Search.scss';

export const Search = () => {
  const [buttonContent, setButtonContent] = useState(ButtonType.SEARCH);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

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

  const aplyQuery = useCallback(
    debounce(dispatch, 1000),
    [],
  );

  useEffect(() => {
    aplyQuery(setQuery(query));
  }, [query]);

  return (
    <div
      className={cn(
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
