import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { getSearchPlaceholder } from '../../helpers/getSearchPlaceholder';
import { getSearchWith } from '../../helpers/searchHelper';
import './SearchBar.scss';

export const SearchBar: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [uiQuery, setUIQuery] = useState(query);

  const debounceQuery = useCallback(
    debounce((curQuery: string | null,
      currentPathname: string,
      currentSearchParams: URLSearchParams) => {
      if (curQuery) {
        currentSearchParams.set('query', curQuery);
      } else {
        currentSearchParams.delete('query');
      }

      navigate({
        pathname: currentPathname,
        search: currentSearchParams.toString(),
      });
    }, 500),
    [],
  );

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUIQuery(event.target.value);
    debounceQuery(event.target.value, pathname, searchParams);
  };

  const onQueryReset = () => {
    setUIQuery('');
    setSearchParams(
      getSearchWith(searchParams, { query: null }),
    );
  };

  useEffect(() => {
    if (query === '' && uiQuery !== '') {
      setUIQuery('');
    }
  }, [query]);

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
        data-cy="searchDelete"
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
