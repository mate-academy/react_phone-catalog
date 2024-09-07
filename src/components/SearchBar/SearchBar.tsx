import { useSearchParams } from 'react-router-dom';
import { Icon } from '../Icon';
import { useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

type Props = {
  className?: string;
};

export const SearchBar: React.FC<Props> = ({ className = '' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const applySearchParams = useMemo(
    () =>
      debounce((newQuery: string) => {
        const params = new URLSearchParams(searchParams);

        if (newQuery.trim() === '') {
          params.delete('query');
        } else {
          params.set('query', newQuery);
        }

        setSearchParams(params);
      }, 1000),
    [searchParams, setSearchParams],
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applySearchParams(event.target.value);
  };

  return (
    <label className={`${className} search-bar`.trim()} htmlFor="search">
      <span className="sr-only">Enter search text</span>
      <input
        type="text"
        id="search"
        className="search-bar__input"
        placeholder="Search"
        value={query}
        onChange={handleSearchChange}
      />
      <Icon iconName="icon-search" />
    </label>
  );
};
