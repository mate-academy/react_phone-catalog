import classNames from 'classnames';
import { ChangeEvent, FC } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../helpers/searchHelper';

export const Search: FC = () => {
  const { pathname } = useLocation();
  const placeholder = `Search in ${pathname.split('/')[1]}...`;
  const [searchParams, setSearchParams] = useSearchParams('');
  const query = searchParams.get('query') || '';
  const isEmptyInput = query.length !== 0;

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams, { query: event.target.value }));
  };

  const handleResetValue = () => {
    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  return (
    <div className="search">
      <input
        className={classNames('search__input', {
          'search__input--show': isEmptyInput,
        })}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChangeValue}
      />
      <button
        aria-label="reset"
        type="button"
        className={classNames('search__reset-btn', {
          'search__reset-btn--show': !isEmptyInput,
        })}
        onClick={handleResetValue}
      />
    </div>
  );
};
