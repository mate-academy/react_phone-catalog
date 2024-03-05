import React from 'react';
import '../styles/Dropdowns.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../helpers/searchHelper';

const sortTypes
  = [{ age: 'Newest' }, { name: 'Alphabetically' }, { price: 'Cheapest' }];

const PER_PAGE_COUNTS = ['All', '4', '8', '16'];

export const Dropdowns: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || sortTypes[0].age;
  const perPage = searchParams.get('perPage') || PER_PAGE_COUNTS[0];

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        sort: e.target.value,
        page: '1',
      }),
    );
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { perPage: e.target.value }),
    );
  };

  return (
    <section className="dropdowns">
      <div className="dropdown">
        <p className="dropdown__title">
          Sort by
        </p>

        <select
          value={sort}
          className="dropdown__select"
          onChange={handleSortByChange}
        >
          {sortTypes.map(type => (
            <option
              value={Object.keys(type).join()}
              key={Object.keys(type).join()}
            >
              {Object.values(type).join()}
            </option>
          ))}
        </select>

        <div className="dropdown__arrow" />
      </div>

      <div className="dropdown">
        <p className="dropdown__title">
          Items on page
        </p>

        <select
          value={perPage}
          className="dropdown__select"
          onChange={handlePerPageChange}
        >
          {PER_PAGE_COUNTS.map(count => (
            <option value={count} key={count}>{count}</option>
          ))}
        </select>

        <div className="dropdown__arrow" />
      </div>
    </section>
  );
};
