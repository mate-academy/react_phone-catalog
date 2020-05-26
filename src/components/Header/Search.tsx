import React from 'react';

export const Search = ({ inputValue, searchProducts, searchReset }: SearchProps) => {
  return (
    <div className="search">
      <input
        type="text"
        value={inputValue}
        className="search__input"
        placeholder="Search in products..."
        onChange={searchProducts}
      />
      {inputValue
        ? (
          <span
            className="search__icon search__icon--clear"
            onClick={searchReset}
          />
        )
        : <span className="search__icon" />}
    </div>
  );
};
