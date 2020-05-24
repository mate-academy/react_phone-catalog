import React from 'react';

export const Search = ({ inputValue, searchPeople }: SearchProps) => {
  return (
    <div className="search__container">
      <input
        type="text"
        value={inputValue}
        className="search"
        placeholder="Search in products..."
        onChange={searchPeople}
      />
      <div className="search__icon" />
    </div>
  );
};
