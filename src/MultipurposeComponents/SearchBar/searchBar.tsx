import React, { FC, useState } from 'react';
import './searchBar.scss';

type Params = {
  pageName: string;
  setSearch: (value: string) => void;
};

export const SearchBar: FC<Params> = ({ pageName, setSearch }) => {
  const [query, setQuery] = useState('');

  const timeOut = setTimeout(() => {
    setSearch(query);
  }, 500);

  const defineSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeOut);
    setQuery(event.target.value);
  };

  return (
    <div className="SearchBar">
      <input
        onChange={(event) => defineSearchValue(event)}
        type="text"
        className="SearchBar__input"
        placeholder={`Search in ${pageName}...`}
      />
      <img src="img/icons/search.svg" alt="search magnifier" className="SearchBar__icon" />
    </div>
  );
};
