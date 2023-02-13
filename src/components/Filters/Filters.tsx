import React from 'react';
import './Filters.scss';
import { SearchParams } from '../../types/SearchParams';

type Props = {
  sort: string,
  perPage: string,
  onSetSearchParams: (params: SearchParams) => void,
};

export const Filters: React.FC<Props> = ({
  sort,
  perPage,
  onSetSearchParams,
}) => {
  return (
    <div className="filters">
      <div className="filters__item">
        <label
          htmlFor="#sort"
          className="text__body text__body--secondary"
        >
          Sort by
        </label>
        <select
          name="sort"
          id="#sort"
          className="text__buttons text__buttons--primary filters__select"
          style={{
            background: 'url(./assets/arrow-down-grey.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center right 15px',
          }}
          value={sort}
          onChange={(event) => onSetSearchParams({ sort: event.target.value })}
        >
          <option
            value="age"
            className="text__body text__body--secondary filters__option"
          >
            Newest
          </option>
          <option
            value="name"
            className="text__body text__body--secondary filters__option"
          >
            Alphabetically
          </option>
          <option
            value="price"
            className="text__body text__body--secondary filters__option"
          >
            Cheapest
          </option>
        </select>
      </div>
      <div className="filters__item">
        <label
          htmlFor="#pagination"
          className="text__body text__body--secondary"
        >
          Items on page
        </label>
        <select
          name="pagination"
          id="#pagination"
          className="text__buttons text__buttons--primary filters__select"
          style={{
            background: 'url(./assets/arrow-down-grey.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center right 15px',
          }}
          value={perPage}
          onChange={(event) => onSetSearchParams({
            perPage: event.target.value,
          })}
        >
          <option
            value="4"
            className=" text__body text__body--secondary filters__option"
          >
            4
          </option>
          <option
            value="8"
            className=" text__body text__body--secondary filters__option"
          >
            8
          </option>
          <option
            value="16"
            className=" text__body text__body--secondary filters__option"
          >
            16
          </option>
          <option
            value="all"
            className=" text__body text__body--secondary filters__option"
          >
            All
          </option>
        </select>
      </div>
    </div>
  );
};
