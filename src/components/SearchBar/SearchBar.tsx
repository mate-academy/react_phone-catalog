import { useState } from 'react';

import search from '../../assets/svg/search.svg';
import close from '../../assets/svg/close.svg';
import './SearchBar.scss';

export const SearchInput = () => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <label className="search-bar">
      <input
        className="search-bar__field"
        value={searchInput}
        onChange={({ target: { value } }) => setSearchInput(value)}
        type="text"
        placeholder="Search in phones..."
      />

      {searchInput ? (
        <button
          className="search-bar__button"
          onClick={() => setSearchInput('')}
          type="button"
        >
          <img className="search-bar__icon" src={close} alt="Clear query" />
        </button>
      ) : (
        <img className="search-bar__icon" src={search} alt="" />
      )}
    </label>
  );
};
