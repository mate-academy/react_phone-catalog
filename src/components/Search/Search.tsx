import React, { useState, FormEvent, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setQuery } from '../../store/query';

export const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [visibleQuery, setVisibleQuery] = useState<string>('');

  const dispatchWithDebounce = useCallback(debounce(dispatch, 800), []);

  const handleSetQuery = (event: FormEvent<HTMLInputElement>) => {
    const newQuery = event.currentTarget.value;

    setVisibleQuery(newQuery);
    dispatchWithDebounce(setQuery(newQuery));
  };

  return (
    <input
      className="header__input"
      type="text"
      placeholder={`Search in ${location.pathname.slice(1)}...`}
      value={visibleQuery}
      onChange={(event) => handleSetQuery(event)}
    />
  );
};
