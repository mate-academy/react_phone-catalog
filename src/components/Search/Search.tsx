import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../../store/query';
import { getQuery } from '../../store';

export const Search = () => {
  const query = useSelector(getQuery);
  const dispatch = useDispatch();


  return (
    <input
      className="header__input"
      type="text"
      placeholder="Search in phones..."
      value={query}
      onChange={(event) => dispatch(setQuery(event.target.value))}
    />
  );
};
