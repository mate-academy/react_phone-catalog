import './SortSelector.scss';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const SortSelector: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'age';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', e.target.value);
    setSearchParams(params);
  };

  return (
    <div className="sort-selector">
      <label htmlFor="sort-select" className="sort-selector__label">
        Sort by
      </label>
      <select
        id="sort-select"
        className="sort-selector__select"
        value={sortBy}
        onChange={handleChange}
      >
        <option value="age">Newest</option>
        <option value="name">Alphabetically</option>
        <option value="price">Cheapest</option>
      </select>
    </div>
  );
};
