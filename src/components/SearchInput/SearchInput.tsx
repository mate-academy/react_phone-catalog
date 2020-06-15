import React from 'react';
import './SearchInput.scss';

const SearchInput = () => {
  return (
    <div className="searchField">
      <input
        type="text"
        className="searchField__input"
      />
      <button
        type="button"
        className="searchField__button"
      >
        <img
          src="./img/icons/header/Search.png"
          alt="search"
        />
      </button>
    </div>
  );
};

export default SearchInput;
