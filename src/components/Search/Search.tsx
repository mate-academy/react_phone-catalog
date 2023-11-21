import React from 'react';
import { useLocation } from 'react-router-dom';

import './Search.scss';

type Props = {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
};

export const Search: React.FC<Props> = ({ searchQuery, setSearchQuery }) => {
  const location = useLocation();
  const showSearchPages = [
    '/Phones',
    '/Tablets',
    '/Accessories',
    '/Favourites',
  ].includes(location.pathname);

  const placeholderName = `Search in ${location.pathname.substring(1)}`;

  const handleSearchChange: React.ChangeEventHandler<
  HTMLInputElement
  > = event => {
    const { value } = event.currentTarget;

    setSearchQuery(value);
  };

  const handleResetSearchQuery = () => {
    setSearchQuery('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchQuery('');
    }
  };

  return (
    <>
      {showSearchPages && (
        <label className="search search__container">
          <input
            onChange={handleSearchChange}
            value={searchQuery}
            placeholder={placeholderName}
            onKeyDown={handleKeyPress}
            className="search__query"
          />

          {searchQuery ? (
            <button
              type="button"
              aria-label="Mute volume"
              className="icon icon__close"
              onClick={handleResetSearchQuery}
            />
          ) : (
            <div className="icon icon__search" />
          )}
        </label>
      )}
    </>
  );
};
