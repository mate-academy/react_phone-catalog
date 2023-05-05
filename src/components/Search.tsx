import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../helpers/searchHelper';
import { debounce } from '../helpers/debounce';

type Props = {
  placeholderName: string,
};

export const Search: React.FC<Props> = ({ placeholderName }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const [query, setQuery] = useState(queryParam);

  const setQuerySearchParams = (value: string) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        { query: value || null, page: '1' },
      ),
    );
  };

  const setQuerySearchParamsDebounced = useMemo(
    () => debounce(setQuerySearchParams, 300),
    [placeholderName],
  );

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setQuerySearchParamsDebounced(event.target.value);
  };

  const deleteQuery = () => {
    setQuery('');
    setSearchParams(
      getSearchWith(searchParams, { query: null, page: '1' }),
    );
  };

  useEffect(() => {
    if (!queryParam) {
      setQuery('');
    }
  }, [placeholderName]);

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        placeholder={`Search in ${placeholderName}...`}
        value={query}
        onChange={onQueryChange}
      />

      {!query.length
        ? <span className="icon icon--search" />
        : (
          <button
            className="button button--delete"
            type="button"
            data-cy="searchDelete"
            onClick={deleteQuery}
          >
            <span className="icon icon--close" />
          </button>
        )}
    </div>
  );
};
