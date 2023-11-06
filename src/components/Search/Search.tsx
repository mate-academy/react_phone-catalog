import { createRef } from 'react';
import classNames from 'classnames';
import './Search.scss';
import { useSearchParams } from 'react-router-dom';
import { updateSearch } from '../../helpers/updateSearch';

export const Search = () => {
  const inputRef = createRef<HTMLInputElement>();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  const handleClick = () => {
    if (!query) {
      inputRef.current?.focus();

      return;
    }

    setSearchParams(
      updateSearch(searchParams, { query: null }),
    );
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      updateSearch(searchParams, { query: e.target.value }),
    );
  };

  return (
    <div className="header__search Search">
      <input
        ref={inputRef}
        type="text"
        className="Search__input"
        placeholder="Search in phones..."
        value={query || ''}
        onChange={handleInput}
      />
      <i
        data-cy="searchDelete"
        className={classNames(
          'icon',
          'Search__icon',
          { 'Search__icon--search': !query },
          { 'Search__icon--delete': query },
        )}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-hidden="true"
      />
    </div>
  );
};
