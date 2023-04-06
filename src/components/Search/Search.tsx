import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as Close } from '../../icons/close.svg';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

import './search.scss';

type Props = {
  placeholder: string;
};

export const Search: React.FC<Props> = ({ placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const newSearch = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    if (searchValue.length === 0) {
      newSearch.delete('query');
    } else {
      newSearch.set('query', searchValue);
    }

    setSearchParams(newSearch.toString());
  }, [searchValue]);

  return (
    <div className="search">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
      />

      {searchValue.length === 0 && (
        <SearchIcon className="search__lens" />
      )}

      {searchValue.length > 0 && (
        <Close
          className="search__close"
          onClick={() => setSearchValue('')}
        />
      )}
    </div>
  );
};
