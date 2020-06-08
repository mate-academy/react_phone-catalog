import { setQuery } from '../../store/query';
import { getQuery } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

export const Search = () => {
  const query = useSelector(getQuery);
  const dispatch = useDispatch();
  console.log(query);

  return (
    <input
      className="header__input"
      type="text"
      placeholder="Search in phones..."
      onChange={(event) => dispatch(setQuery(event.target.value))}
    />
  )
}
