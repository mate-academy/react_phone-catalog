import { Link, useSearchParams } from 'react-router-dom';
import { getSearch } from '../../../utils/searchHelper';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const hendlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearch(searchParams, { query: e.target.value }));
  };

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Search in favourites..."
        value={query}
        onChange={hendlerInput}
      />
      <Link
        className="search__cross"
        to={{
          search: getSearch(searchParams, { query: '' }),
        }}
      />
    </div>
  );
};
