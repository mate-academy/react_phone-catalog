import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../utils/searchHelper';

import './Search.scss';

export const Search = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setQuery(inputValue);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      setSearchParams(
        getSearchWith(searchParams, {
          query: inputValue || null,
        }),
      );
    }, 750);

    setTypingTimeout(timeout);
  };

  const handleClearSearch = () => {
    setQuery('');
    setSearchParams(
      getSearchWith(searchParams, {
        query: null,
      }),
    );
  };

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder={`Search in ${pathname.slice(1)}...`}
        value={query}
        onChange={handleChangeQuery}
      />

      {query.length ? (
        <button
          type="button"
          aria-label="clear search"
          className="search__button
          search__button--clear"
          onClick={handleClearSearch}
        />
      ) : (
        <button
          type="button"
          aria-label="search"
          className="search__button
          search__button--loupe"
        />
      )}
    </div>
  );
};
