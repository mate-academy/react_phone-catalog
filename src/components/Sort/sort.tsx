import React from 'react';
import './sort.scss';

export const Sort = () => {
  return (
    <div className="sort">
      <div className="sort__container">
        <label htmlFor="query" className="sort__container__label">
          Sort by
        </label>
        <select
          name="sort by query"
          id="query"
          className="sort__container__select--by"
          defaultValue={''}
        >
          <option value="" disabled>
            Select
          </option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </div>

      <div className="sort__container">
        <label htmlFor="number" className="sort__container__label">
          Items on page
        </label>
        <select
          name="sort by number"
          id="number"
          className="sort__container__select--number"
        >
          <option value="" disabled selected>
            16
          </option>
        </select>
      </div>
    </div>
  );
};
