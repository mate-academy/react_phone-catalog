import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearch } from '../../helpers/utils/searchHelper';

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
        className={classNames(
          'search__button search__button--search',
          { 'search__button--cross': query },
        )}
        to={{
          search: getSearch(searchParams, { query: '' }),
        }}
        data-cy="searchDelete"
      />
    </div>
  );
};
