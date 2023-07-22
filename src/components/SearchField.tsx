import React, { ChangeEvent, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import searchIcon from '../imgs/icons/Search.svg';
import cross from '../imgs/icons/Close.svg';

export const SearchField: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [params, setParams] = useSearchParams();

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearchQuery(query);
    setParams({ query });
  };

  const handleResetQuery = () => {
    setSearchQuery('');
    setParams({ query: '' });
  };

  useEffect(() => {
    if (params.has('query')) {
      setIsActive(true);
      setSearchQuery(params.get('query') || '');
    } else {
      setIsActive(false);
    }
  }, [params]);

  if (!isActive) {
    return null;
  }

  return (
    <div className="SearchField">
      {!!searchQuery.length && (
        <button
          type="button"
          onClick={() => handleResetQuery()}
        >
          <img src={cross} alt="close" />
        </button>
      )}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInput}
        placeholder="Search in phones..."
        className="SearchField__input"
      />
      <img src={searchIcon} alt="search" />
    </div>
  );
};
