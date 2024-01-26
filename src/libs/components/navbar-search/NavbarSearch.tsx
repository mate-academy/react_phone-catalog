import {
  useCallback, useMemo, useRef, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import debounce from 'lodash.debounce';

import './styles.scss';

import { ButtonViews, IconNames, SearchParams } from '../../enums';
import { getSearchWith } from '../../helpers';
import { useOutsideClick } from '../../hooks';
import { Button } from '../button/Button';
import { SearchParamsType } from '../../types';

export const NavbarSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(
    searchParams.get(SearchParams.QUERY) || '',
  );

  const [isShowOnTablets, setIsShowOnTablets] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const setSearchWith = useCallback((params: SearchParamsType) => {
    const updatedParams = getSearchWith(searchParams, params);

    setSearchParams(updatedParams);
  }, [searchParams, setSearchParams]);

  const applyQuery = useMemo(() => (
    debounce((params: SearchParamsType) => setSearchWith(params), 500)
  ), [setSearchWith]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    applyQuery({
      [SearchParams.QUERY]: event.target.value || null,
      [SearchParams.PAGE]: null,
    });
  };

  const handleResetQuery = () => {
    setQuery('');
    setSearchWith({ [SearchParams.QUERY]: null });
  };

  const handleShowOnTablets = () => {
    setIsShowOnTablets(true);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  useOutsideClick(searchRef, () => {
    setIsShowOnTablets(false);
  });

  return (
    <div
      ref={searchRef}
      className={classNames('navbar-search', {
        'navbar-search--show-on-tablet': isShowOnTablets,
      })}
    >
      <form
        className="navbar-search__form"
      >
        <input
          ref={inputRef}
          type="search"
          className="navbar-search__input"
          placeholder="Search in phones..."
          value={query}
          onChange={handleQueryChange}
        />

        <div className="navbar-search__control navbar-search__control--reset">
          <Button
            icon={IconNames.PLUS}
            iconOptions={{ rotate: 45 }}
            view={ButtonViews.NAVBAR}
            onClick={handleResetQuery}
            aria-label="Delete search"
            data-cy="searchDelete"
          />
        </div>
      </form>

      <div className="navbar-search__control navbar-search__control--show">
        <Button
          icon={IconNames.SEARCH}
          view={ButtonViews.NAVBAR}
          aria-label="Show search"
          onClick={handleShowOnTablets}
        />
      </div>
    </div>
  );
};
