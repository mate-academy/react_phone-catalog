import { useState } from 'react';
import { ClearIcon } from './Icons/ClearIcon';
import { SearchIcon } from './Icons/SearchIcon';

export const InputSearch = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="header__search-control">
      <input
        className="header__search"
        type="text"
        placeholder="Search in favourites..."
        maxLength={30}
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      {!inputValue.length
        ? (
          <i className="header__search__icon">
            <SearchIcon />
          </i>
        )
        : (
          <button
            type="button"
            className="header__search__icon header__clear-icon"
            onClick={() => {
              setInputValue('');
            }}
          >
            <ClearIcon />
          </button>
        )}
    </div>
  );
};
