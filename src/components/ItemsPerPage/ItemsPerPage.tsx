import './ItemsPerPage.scss';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const ItemsPerPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || '16';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', e.target.value);
    params.set('page', '1');
    setSearchParams(params);
  };

  return (
    <div className="items-per-page">
      <label htmlFor="per-page-select" className="items-per-page__label">
        Items on page
      </label>
      <select
        id="per-page-select"
        className="items-per-page__select"
        value={perPage}
        onChange={handleChange}
      >
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="all">All</option>
      </select>
    </div>
  );
};
