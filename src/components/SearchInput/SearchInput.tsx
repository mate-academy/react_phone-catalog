import { useState } from 'react';

import search from '../../assets/search.svg';
import close from '../../assets/close.svg';
import './SearchInput.scss';

export const SearchInput = () => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <label className="search-input">
      <input
        className="search-input__field"
        value={searchInput}
        onChange={({ target: { value } }) => setSearchInput(value)}
        type="text"
        placeholder="Search in phones..."
      />

      {searchInput ? (
        <button
          className="search-input__button"
          onClick={() => setSearchInput('')}
          type="button"
        >
          <img
            className="search-input__icon"
            src={close}
            alt="Clear query"
          />
        </button>
      ) : (
        <img className="search-input__icon" src={search} alt="" />
      )}
    </label>
  );
};
