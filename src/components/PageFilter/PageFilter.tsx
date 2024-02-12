/* eslint-disable jsx-a11y/control-has-associated-label */
import { useRef } from 'react';
import './PageFilter.scss';

export const PageFilter = () => {
  const sortField = useRef<HTMLSelectElement>(null);
  const filterField = useRef<HTMLSelectElement>(null);

  const handleSortClick = () => {
    if (sortField.current) {
      sortField.current.click();
    }
  };

  const handleFilterClick = () => {

  };

  return (
    <div className="page-filter">
      <div className="page-filter__sort-by">
        <label
          // htmlFor="sort-by"
          className="
            page-filter__label
            page-filter__label--sort
          "
        >
          <span className="page-filter__label-text">
            Sort by
          </span>

          <select
            name="sort-by"
            // id="sort-by"
            className="page-filter__select"
            ref={sortField}
          >
            <option value="newest">
              Newest
            </option>
            <option value="rate">
              Top rated
            </option>
            <option value="price-to-high">
              Price: low to high
            </option>
            <option value="price-to-low">
              Price: high to low
            </option>
          </select>

          <span
            className="page-filter__arrow"
            role="presentation"
            onClick={handleSortClick}
          />
        </label>
      </div>

      <div className="page-filter__item-count-filter">
        <label
          htmlFor="item-on-page"
          className="
            page-filter__label
            page-filter__label--filter
          "
        >
          <span className="page-filter__label-text">
            Items on page
          </span>

          <select
            name="item-on-page"
            id="item-on-page"
            className="page-filter__select"
            ref={filterField}
          >
            <option value="16">16</option>
            <option value="16">34</option>
            <option value="16">42</option>
          </select>

          <span
            className="page-filter__arrow"
            role="presentation"
            onClick={handleFilterClick}
          />
        </label>
      </div>
    </div>
  );
};
