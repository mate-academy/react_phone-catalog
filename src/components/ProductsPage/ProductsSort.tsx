import React from 'react';

interface Props {
  sortByOption: string;
  perPage: string;
  setParams: (event: React.ChangeEvent<HTMLSelectElement>) => (void);
  setPerPage: (event: React.ChangeEvent<HTMLSelectElement>) => (void);
}

export const ProductsSort: React.FC<Props> = ({
  sortByOption, perPage, setParams, setPerPage,
}) => {
  return (
    <div className="phones__sorting">
      <div className="phones__wrapper">
        <p className="phones__sort-name">Sort by</p>
        <select
          value={sortByOption}
          onChange={setParams}
          className="phones__sort"
          name="sort-by"
          id="sort-by"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div className="phones__wrapper">
        <p className="phones__sort-name">Items on page</p>
        <select
          value={perPage}
          className="phones__sort"
          name="items-per-page"
          id="items-per-page"
          onChange={setPerPage}
        >
          <option value="4">4</option>
          <option value="8" selected>8</option>
          <option value="12">12</option>
        </select>
      </div>
    </div>
  );
};
