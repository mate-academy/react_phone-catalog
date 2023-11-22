import './Search.scss';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export const Search = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const sort = searchParams.get('sort') || '';
  const itemsPerPage = parseInt(searchParams.get('itemsPerPage')
    || '0', 10) || null;
  const currentPage = parseInt(searchParams.get('page') || '1', 10) || 1;

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchParams((prevSearchParams) => {
        const newSearchParams = new URLSearchParams(prevSearchParams);

        newSearchParams.set('sort', sort);
        newSearchParams.set('itemsPerPage', itemsPerPage?.toString() || 'all');
        newSearchParams.set('page', currentPage.toString());

        if (value !== '') {
          newSearchParams.set('query', value);
        } else {
          newSearchParams.delete('query');
        }

        return newSearchParams;
      });
    }, 500),
    [currentPage, itemsPerPage, setSearchParams, sort],
  );

  const handleSearchChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = target;

    setQuery(value);
    debouncedSearch(value);
  };

  const handleSearchDelete = () => {
    setQuery('');
    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);

      newSearchParams.delete('query');

      return newSearchParams;
    });
  };

  // const isPhonePage = location.pathname.startsWith('/phones');

  return (
    <div className="Header_search">
      <div className="Header_search_input-container">
        <input
          type="text"
          className="Header_search-input"
          placeholder={
            `Search in ${location.pathname.slice(1, location.pathname.length)}...`
          }
          value={query}
          onChange={handleSearchChange}
        />
        {query ? (
          <button
            className="Header_search-delete"
            onClick={handleSearchDelete}
            data-cy="searchDelete"
            type="button"
            aria-label="cleanquery"
          />
        ) : (
          <div className="Header_search-search" />
        )}
      </div>
    </div>
  );
};
