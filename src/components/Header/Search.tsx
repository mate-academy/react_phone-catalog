import React from 'react';

export const Search = ({ inputValue, searchProducts }: SearchProps) => {
  return (
    <div className="search__container">
      <input
        type="text"
        value={inputValue}
        className="search"
        placeholder="Search in products..."
        onChange={searchProducts}
      />
      <div className="search__icon" />
    </div>
  );
};
