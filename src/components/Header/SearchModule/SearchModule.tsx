import classNames from 'classnames';
import style from './SearchModule.module.scss';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../../types/SearchParams';

function debounce(callback: (query: string) => void, delay: number = 300) {
  let timerId = 0;

  return (arg: string) => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      callback(arg);
    }, delay);
  };
}

export const SearchModule = () => {
  const [showField, setShowField] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSearchQuery(() => {
      const curQuery = searchParams.get(SearchParams.query);

      return curQuery ? curQuery : '';
    });
  }, [searchParams]);

  const updateSearchParams = useCallback(
    (val: string) => {
      const params = new URLSearchParams(searchParams);

      if (val) {
        params.set(SearchParams.query, val);
      } else {
        params.delete(SearchParams.query);
      }

      setSearchParams(() => params);
    },
    [searchParams, setSearchParams],
  );

  const searchRef = useRef<HTMLInputElement>(null);

  const applyQuery = useMemo(
    () => debounce(updateSearchParams),
    [updateSearchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    setSearchQuery(() => val);
    applyQuery(val);
  };

  const handleClicks = (eve: MouseEvent) => {
    if (searchRef.current) {
      if (!searchRef.current?.contains(eve.target as Node)) {
        setShowField(false);
      }
    }
  };

  useEffect(() => document.addEventListener('click', handleClicks), []);

  return (
    <div
      ref={searchRef}
      className={classNames(style.container)}
    >
      <div
        className={classNames(style.icon_container)}
        onClick={() => setShowField(prev => !prev)}
      >
        <div className={classNames(style.icon, style.icon_search)} />
      </div>

      {showField && (
        <input
          className={style.input}
          type="text"
          placeholder="Search ..."
          value={searchQuery}
          onChange={handleQueryChange}
        />
      )}
    </div>
  );
};
