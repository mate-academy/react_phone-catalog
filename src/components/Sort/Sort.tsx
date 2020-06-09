import React, { ChangeEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPerPage } from '../../store/pagination';
import { sortBy } from '../../store/sort';


export const Sort = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sorting = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    searchParams.set('sort', value);

    history.push({
      search: searchParams.toString(),
    });

    dispatch(sortBy(value));
  };

  const selectQuantity = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    searchParams.set('perPage', value);

    history.push({
      search: searchParams.toString(),
    });

    dispatch(setPerPage(+value));
  };

  return (
    <>
      <div className="container__filter filter">
        <form className="filter__sort-by">
          <p className="filter__text">Sort by</p>
          <select className="filter__sorted sorted" onChange={(event) => sorting(event)}>
            <option value="age" className="filter__option">Newest</option>
            <option value="name" className="filter__option">Alphabetically</option>
            <option value="price" className="filter__option">Cheapest</option>
          </select>
        </form>
        <form className="filter__sort-by">
          <p className="filter__text">Items on page</p>
          <select className="filter__selected sorted" onChange={(event) => selectQuantity(event)}>
            <option value="16" className="filter__option">16</option>
            <option value="8" className="filter__option">8</option>
            <option value="4" className="filter__option">4</option>
          </select>
        </form>
      </div>
    </>
  );
};
