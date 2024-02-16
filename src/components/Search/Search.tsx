import React from 'react';
import cn from 'classnames';
import './Search.scss';
import { useLocation, useSearchParams } from 'react-router-dom';

const Search: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.replaceAll('/', '');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const setParams = (name: string, value: string) => {
    const newParams = {
      ...Object.fromEntries(searchParams),
      [name]: value,
    };

    if (name === 'sortBy' || name === 'perPage') {
      newParams.currentPage = '1';
    }

    setSearchParams(newParams);
  };

  const pathWhereShould = [
    'phones',
    'tablets',
    'accessories',
    'favourites',
  ];

  const shouldShowInput = () => {
    return pathWhereShould.includes(currentPath);
  };

  return (
    <>
      {shouldShowInput() && (
        <div className="search__wrapper">
          <input
            className={cn('search__input', {
              'search__input--active': query,
            })}
            type="text"
            placeholder={`Search in ${currentPath}...`}
            value={query}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setParams('query', event.target.value);
            }}
          />
          {/* eslint-disable-next-line */}
          <button
            className={cn('search__input__button', {
              'search__input__button--active': query,
            })}
            onClick={() => {
              setParams('query', '');
            }}
            data-cy="searchDelete"
          />
        </div>
      )}
    </>
  );
};

export default Search;
