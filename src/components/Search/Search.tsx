import React, { useState } from 'react';
import './Search.scss';
import crossIcon from '../../images/cross.svg';
import searchIcon from '../../images/search.svg';

type Props = {
  text: string;
  setQuery: (queryItem: string) => void;
};

export const Search: React.FC<Props> = ({ text, setQuery }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setQuery(event.target.value);
  };

  const deleteQuery = () => {
    setSearchValue('');
    setQuery('');
  };

  return (
    <div className="search">
      <input
        className="search__field"
        type="text"
        placeholder={`Search in ${text}...`}
        value={searchValue}
        onChange={handleChange}
      />

      {searchValue
        ? (
          <img
            src={crossIcon}
            alt="cross icon"
            className="search__icon"
            onClick={deleteQuery}
            aria-hidden="true"
            data-cy="searchDelete"
          />
        ) : (
          <img
            src={searchIcon}
            alt="search icon"
            className="search__icon"
          />
        )}
    </div>
  );
};
