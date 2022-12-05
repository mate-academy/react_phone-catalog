import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from '../../helpers/getNumbers';
import { Paginator } from './Paginator';
import { updateSearch } from '../../helpers/updateSearch';

export const Settings = () => {
  const [totalItems] = useState(16);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '4';

  const pagesCount = Math.ceil(totalItems / +perPage);

  const pagesList = getNumbers(1, pagesCount);

  const sortOptions = [
    { name: 'Newest', value: 'age' },
    { name: 'Alphabetically', value: 'name' },
    { name: 'Cheapest', value: 'price' },
  ];

  const onChangeSortValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(
      updateSearch(
        searchParams,
        { sort: event.target.value, perPage },
      ),
    );
  };

  const onChangeProductsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearchParams(
      updateSearch(
        searchParams,
        { perPage: event.target.value, sort },
      ),
    );
  };

  return (
    <section>
      <select
        name="sortProducts"
        value={sort}
        onChange={onChangeSortValue}
      >
        {sortOptions.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.name}
          </option>
        ))}
      </select>
      <select
        name="productPerPage"
        id="productPerPage"
        value={perPage}
        onChange={onChangeProductsPerPage}
      >
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
      </select>
      <Paginator pagesList={pagesList} />
    </section>
  );
};
