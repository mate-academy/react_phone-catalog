import React, { useRef } from 'react';
import cn from 'classnames';

export const Search = ({
  inputValue,
  searchProducts,
  searchReset,
}: SearchProps) => {
  const inputEl = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    searchReset();

    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  };

  return (
    <div className="search">
      <input
        ref={inputEl}
        type="text"
        value={inputValue}
        className="search__input"
        placeholder="Search in products..."
        onChange={searchProducts}
      />
      <button
        type="button"
        aria-label="Clear input"
        className={cn({
          search__button: true,
          'search__button--clear': inputValue,
        })}
        onClick={handleClick}
        disabled={inputValue.length === 0}
      />
    </div>
  );
};
