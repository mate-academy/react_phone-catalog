import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';

let sortParams = [
  {title: 'Newest', value: 'age'},
  {title: 'Price high to low', value:'high_price'},
  {title: 'Price low to high',  value:'low_price'}
]

const itemsCount = [8, 16, 32, 64];

export const SortBlock = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const history = useHistory();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('perPage', e.target.value);
    history.push({
      search: searchParams.toString()
    });
  }

  return (
  <section className="catalog__sort">
    <form className="catalog__sort-form">
      <div>
        <label className="catalog__sort-title">
          Sort by
        </label>
        <select
          className="catalog__sort-select"
          onChange={(e) => handleSort(e)}
          value={searchParams.get('sortBy') || ''}
        >
          {sortParams.map(param => (
            <option
              key={param.title}
              value={param.value}
            >
              {param.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="catalog__sort-title">
          Items on page
        </label>
        <select
          className="catalog__sort-select"
          onChange={(e) => handleSort(e)}
        >
          {itemsCount.map(count => (
            <option
              key={count}
              value={count}
            >
              {count}
            </option>
          ))}
        </select>
      </div>
    </form>
  </section>
  )
}
