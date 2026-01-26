import React from 'react';
import { SortBy } from '../../types/Sort';
import { useSearchParams } from 'react-router-dom';

export const Dropdowns = () => {
  const [searchParams, setSerachParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || SortBy.Newest;
  const sortPage = searchParams.get('sortPage') || '16';

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (+e.target.value) {
      const params = new URLSearchParams(searchParams);

      params.set('sortPage', e.target.value);
      setSerachParams(params);
    } else {
      const params = new URLSearchParams(searchParams);

      params.set('sortBy', e.target.value);
      setSerachParams(params);
    }
  };

  return (
    <div className="catalog__dropdowns">
      <div className="catalog__dropdown">
        <label
          htmlFor="catalog__sortby"
          className="catalog__sortby_label label"
        >
          Sort by
        </label>
        <select
          id="catalog__sortby"
          className="catalog__sortby select"
          onChange={handleChangeSort}
          value={sortBy}
        >
          <option value="newest">Newest</option>
          <option value="name">Name</option>
          <option value="cheaper">Cheaper</option>
        </select>
      </div>
      <div className="catalog__dropdown">
        <label htmlFor="catalog__items" className="catalog__items_label label">
          Items on page
        </label>
        <select
          id="catalog__items"
          className="catalog__items select"
          onChange={handleChangeSort}
          value={sortPage}
        >
          <option value="16">16</option>
          <option value="24">24</option>
          <option value="32">32</option>
        </select>
      </div>
    </div>
  );
};
