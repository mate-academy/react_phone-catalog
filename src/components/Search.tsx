import React from 'react';
import cn from 'classnames';

export const Search = ({ inputValue, searchProducts }: SearchProps) => {
  return (
    <div className="search">
      <input
        type="text"
        value={inputValue}
        className="search__input"
        placeholder="Search in products..."
        onChange={searchProducts}
      />
      <span className={cn({
        search__icon: true,
        'search__icon--clear': inputValue,
      })}
      />
    </div>
  );
};
