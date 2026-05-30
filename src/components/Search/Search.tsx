import { useLocation, useSearchParams } from 'react-router-dom';
import style from './Search.module.scss';
import { SEARCHABLE_PATH } from '../../constants/constants';
import { PathType } from '../../types/Types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../ui/Icon/Icon';
import { useDebounce } from '../../hook/useDebounce';
import { getSearchWith } from '../../utils/searchHelper';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const { pathname } = useLocation();
  const debounceQuery = useDebounce(query, 500);
  const prevQueryRef = useRef<string | null>(null);

  useEffect(() => {
    const newParams = getSearchWith(searchParams, {
      query: debounceQuery || null,
    });

    const newPar = new URLSearchParams(newParams);

    if (prevQueryRef.current !== debounceQuery) {
      newPar.delete('page');
      setSearchParams(newPar);
      prevQueryRef.current = debounceQuery;
    }
  }, [setSearchParams, debounceQuery, searchParams]);

  const isShowSearch = SEARCHABLE_PATH.includes(
    pathname.replace('/', '') as PathType,
  );

  const title = useMemo(() => {
    const path = pathname.replace('/', '');

    return path.charAt(0).toUpperCase() + path.slice(1);
  }, [pathname]);

  if (!isShowSearch) {
    return null;
  }

  return (
    <div className={style.search}>
      <input
        type="text"
        className={style.search__input}
        placeholder={`Search in ${title}`}
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      {query ? (
        <button className={style.search__button} onClick={() => setQuery('')}>
          <Icon className={style.search__icon} nameIcon="close" />
        </button>
      ) : (
        <button className={style.search__button}>
          <Icon className={style.search__icon} nameIcon="search" />
        </button>
      )}
    </div>
  );
};
