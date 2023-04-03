import classNames from 'classnames';
import { ChangeEvent } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../helpers/calc/helper';
import { SearchLink } from '../SearchLink/SearchLink';

export const SearchFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const fomattedPathname = pathname.slice(1);
  const searchQuery = searchParams.get('query') || '';

  const handleQueryUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const newParams = getSearchWith(
      searchParams,
      { query: e.target.value || null, page: null },
    );

    setSearchParams(newParams);
  };

  return (
    <div className="header__utils-search-wrap">
      <input
        id="search"
        value={searchQuery}
        className="header__utils-search"
        type="text"
        placeholder={`Search in ${fomattedPathname}...`}
        onChange={handleQueryUpdate}
      />

      <label htmlFor="search">
        <SearchLink params={{ query: null }}>
          <i
            data-cy="searchDelete"
            className={classNames(
              'icon',
              'icon--search',
              'header__search-icon', {
                'icon--cross': searchQuery,
              },
            )}
          />
        </SearchLink>
      </label>
    </div>
  );
};
