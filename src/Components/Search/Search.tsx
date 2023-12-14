import { ChangeEvent, useState } from 'react';
import './Search.scss';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('query');
  const [query, setQuery] = useState(queryParam || '');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setQuery(newQuery);

    if (newQuery) {
      setSearchParams(getSearchWith(searchParams, { query: newQuery }));
    } else {
      setSearchParams(getSearchWith(searchParams, { query: null }));
    }
  };

  return (
    <div className="search-container">
      <input
        className="search__input"
        placeholder="Search in phones..."
        value={query}
        onChange={handleQueryChange}
      />
    </div>
  );
};
