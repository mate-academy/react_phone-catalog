import React, { FC, useState, ChangeEvent } from 'react';
import { PhonesCatalog } from './PhonesCatalog';

export const PhonesPage: FC = () => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('age');

  const handleFilter = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilter(e.target.value);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <div className="phones">
      <div className="settings">
        <input
          type="text"
          value={filter}
          onChange={handleFilter}
          className="settings__search"
          placeholder="Search..."
        />
        <select
          defaultValue="disabled"
          onChange={(e) => handleSelect(e)}
          className="settings__select"
        >
          <option value="disabled" disabled>Sort by</option>
          <option value="age">Date</option>
          <option value="name">Name</option>
        </select>
      </div>
      <PhonesCatalog filter={filter} sort={sort} />
    </div>
  );
};
