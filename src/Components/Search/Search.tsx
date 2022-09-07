import { debounce } from 'lodash';
import {
  useCallback, useContext, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { QueryContext } from '../Context/QueryContext';
import './Search.scss';

export const Search = () => {
  const location = useLocation().pathname;
  const [value, setValue] = useState('');
  const { setQuery } = useContext(QueryContext);

  const paths = ['/phones', '/tablets', '/accessories', '/favourites'];
  const isValidPath = () => paths.find(path => path === location);

  const applyQuery = useCallback(debounce(setQuery, 1000), []);

  // useMemo(() => {
  //   if (!query) {
  //     searchParams.delete('query');
  //   } else {
  //     searchParams.set('query', query);
  //   }

  //   setSearchParams(searchParams);
  // }, [query]);

  return (
    <>
      {isValidPath() && (
        <div className="Search">
          <input
            type="text"
            name="search"
            value={value}
            placeholder={`Search in ${location.slice(1)}...`}
            className="Search__input"
            onChange={(ev) => {
              setValue(ev.target.value);
              applyQuery(ev.target.value);
            }}
            onFocus={(ev) => {
              ev.target.closest('.Search')?.classList.add('Search--focus');
              ev.target.classList.add('Search--focus');
            }}
            onBlur={(ev) => {
              ev.target.closest('.Search')?.classList.remove('Search--focus');
              ev.target.classList.remove('Search--focus');
            }}
          />
          {value && (
            <button
              type="button"
              aria-label="clear search"
              className="Search__icon Search__icon--clear"
              onClick={() => {
                setValue('');
                setQuery('');
              }}
              data-cy="searchDelete"
            />
          )}
          {!value && (
            <div className="Search__icon Search__icon--search" />
          )}
        </div>
      )}
    </>
  );
};
