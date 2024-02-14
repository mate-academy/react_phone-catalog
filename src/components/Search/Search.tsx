import React, { useCallback, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setQuery } from '../../store/slices/productsSlice';
import { normalizeUrlParams }
  from '../../helpers/funcService/normalizeUrlParams';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { CloseIcon } from '../../assets/icons/CloseIcon';

type Props = {
  validPath: string,
};

export const Search: React.FC<Props> = ({ validPath }) => {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);

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

    dispatch(setQuery(query));
  };

  const handleClearQuery = useCallback(() => {
    if (buttonType === 'close') {
      setSearchParams(normalizeUrlParams(searchParams, { query: null }));
      setButtonType('search');
    } else if (inputRef.current) {
      setButtonType('close');
      inputRef.current.focus();
    }
  }, [buttonType]);

  return (
    <div className="header__query-input__box">
      <input
        type="text"
        className="header__query-input"
        placeholder={`Search in ${validPath} ...`}
        onChange={handleSearchQueryChange}
        value={query}
        ref={inputRef}
      />

      <button
        type="button"
        className="header__query-input__icon"
        onClick={handleClearQuery}
      >
        {buttonType === 'search' ? <SearchIcon /> : <CloseIcon />}
        {/* {} */}
      </button>
    </div>
  );
};
