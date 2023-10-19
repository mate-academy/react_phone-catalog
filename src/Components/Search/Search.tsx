import { debounce } from 'lodash';
import {
  useCallback, useContext, useRef, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { QueryContext } from '../Context/QueryContext';
import './Search.scss';

export const Search = () => {
  const location = useLocation().pathname;
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { setQuery } = useContext(QueryContext);

  const paths = ['/phones', '/tablets', '/accessories', '/favourites'];
  const isValidPath = () => paths.find(path => path === location);

  const applyQuery = useCallback(debounce(setQuery, 1000), []);

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
            ref={inputRef}
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
            <button
              type="button"
              aria-label="focus search"
              className="Search__icon Search__icon--search"
              onClick={() => {
                inputRef.current?.focus();
              }}
              data-cy="searchDelete"
            />
          )}
        </div>
      )}
    </>
  );
};
