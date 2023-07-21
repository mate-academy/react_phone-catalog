import { FC, useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchPlaceholder } from '../../helpers/getSearchPlaceholder';
import { getSearchWith } from '../../helpers/searchHelper';
import './SearchBar.scss';

export const SearchBar: FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [uiQuery, setUIQuery] = useState(query);

  const debounceQuery = useCallback(
    debounce((curQuery: string | null) => {
      setSearchParams(
        getSearchWith(searchParams, { query: curQuery || null }),
      );
    }, 500),
    [],
  );

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUIQuery(event.target.value);
    debounceQuery(event.target.value);
  };

  const onQueryReset = () => {
    setUIQuery('');
    setSearchParams(
      getSearchWith(searchParams, { query: null }),
    );
  };

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        placeholder={getSearchPlaceholder(pathname)}
        value={uiQuery}
        onChange={onQueryChange}
      />
      <button
        type="button"
        className={classNames('search__button', {
          'search__button--disabled': !query,
        })}
        onClick={onQueryReset}
      >
        {query ? (
          <img
            src="icons/closeButton.svg"
            alt="search button"
          />
        ) : (
          <img
            src="icons/magnifier.svg"
            alt="close button"
          />
        )}
      </button>
    </div>
  );
};
