/* eslint-disable no-console */
/* eslint-disable max-len */
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchField.scss';
import classNames from 'classnames';
import { useSearchContext } from '../Context/Context';

export const SearchField: React.FC = () => {
  const { pathname, search } = useLocation();
  const { searchText, setSearchText } = useSearchContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleOpenClose = () => {
    const hasTextInQuery = search && search.includes('query=');

    if (hasTextInQuery && searchText.length > 0) {
      setSearchText('');
    } else if (!searchText.length) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="searchField">
      <input
        ref={inputRef}
        type="text"
        className="searchField__input"
        id="search"
        placeholder={`Search in ${pathname.slice(1)}...`}
        value={searchText}
        onChange={handleInputChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
        }}
      />

      <button
        type="button"
        className="searchField__button"
        data-cy="searchDelete"
        onClick={handleOpenClose}
      >
        <span
          className={classNames('searchField__img', {
            'searchField__img-close': isFocus && searchText.length > 0,
          })}
        />
      </button>

    </div>
  );
};
