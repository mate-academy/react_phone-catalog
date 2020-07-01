import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { setPerPage } from '../../store/pagination';
import { sortBy } from '../../store/sort';
import 'semantic-ui-css/semantic.min.css';

const options = [
  { key: 'Newest', text: 'Newest', value: 'age' },
  { key: 'Alphabetically', text: 'Alphabetically', value: 'name' },
  { key: 'Cheapest', text: 'Cheapest', value: 'price' },
];

const numbers = [
  { key: 4, text: 4, value: 4 },
  { key: 8, text: 8, value: 8 },
  { key: 16, text: 16, value: 16 },
];

export const Sort = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sorting = (event: any, data: any) => {
    let { value } = event.target;

    value = data.value;

    searchParams.set('sort', value);

    history.push({
      search: searchParams.toString(),
    });

    dispatch(sortBy(value));
  };

  const selectQuantity = (event: any, data: any) => {
    let { value } = event.target;

    value = data.value;
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
          <Dropdown
            options={options}
            selection
            placeholder="Choose"
            onChange={sorting}
          />
        </form>

        <form className="filter__sort-by">
          <p className="filter__text">Items on page</p>
          <Dropdown
            className="filter__selected"
            options={numbers}
            selection
            placeholder="Choose"
            onChange={selectQuantity}
          />
        </form>
      </div>
    </>
  );
};
