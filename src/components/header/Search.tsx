import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

type SearchProps = {
  currentPage: string
};

const QUERY_KEY = 'query';
const PAGE_KEY = 'page';

export const Search = ({ currentPage }: SearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const input = useRef<HTMLInputElement>(null);
  const searchQuery = searchParams.get(QUERY_KEY);

  const placeholderText = `Search in ${currentPage}...`;
  let timeoutId: number;

  const handleClick = () => {
    searchParams.delete(QUERY_KEY);
    setSearchParams(searchParams);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    clearTimeout(timeoutId);

    timeoutId = +setTimeout(() => {
      if (newQuery) {
        searchParams.set(QUERY_KEY, newQuery);

        const previousPage = searchParams.get(PAGE_KEY);

        if (previousPage !== null) {
          searchParams.set(PAGE_KEY, '1');
        }

        setSearchParams(searchParams);
      } else {
        handleClick();
      }
    }, 1000);
  };

  useEffect(() => {
    const currentInput = input.current;

    if (currentInput !== null) {
      currentInput.value = searchQuery || '';
    }
  }, [searchQuery]);

  return (
    <div className="search">
      {searchParams.get(QUERY_KEY) ? (
        <button
          onClick={handleClick}
          type="button"
          className="search__close"
          data-cy="searchDelete"
        >
          <img src="img/header/search/close.svg" alt="Clear search" />
        </button>
      ) : (
        <label className="search__label" htmlFor="search">
          <img src="img/header/search/search.svg" alt="Search" />
        </label>
      )}

      <input
        id="search"
        className="search__input"
        type="text"
        placeholder={placeholderText}
        onChange={handleChange}
        ref={input}
      />
    </div>
  );
};
