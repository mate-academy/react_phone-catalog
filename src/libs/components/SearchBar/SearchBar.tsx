/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../../utils';
import { SearchParamsNames } from '../../constants';

import { Icon } from '../Icon';

import './SearchBar.scss';

type Props = {
  classNames: string;
  isInputExpanded: boolean;
  onClick?: (value: boolean) => void;
};

export const SearchBar: React.FC<Props> = ({
  classNames,
  isInputExpanded,
  onClick = () => {},
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(
    searchParams.get(SearchParamsNames.query) || '',
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();

  const placeholder = `Search in ${pathname.split('/')[1]}`;

  const handleSetParams = (paramValue: string) => {
    const newParams = getSearchWith(
      { [SearchParamsNames.query]: paramValue || null },
      searchParams,
    );

    setSearchParams(newParams);
  };

  const applyQuery = useCallback(debounce(handleSetParams, 1000), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    applyQuery(e.target.value);
  };

  const handleReset = () => {
    setQuery('');
    searchParams.delete(SearchParamsNames.query);
    setSearchParams(searchParams);
  };

  const handleButtonClick = () => {
    if (!query) {
      inputRef.current?.focus();
    }

    if (query) {
      handleReset();
    }
  };

  const handleSmallScreenButtonClick = () => {
    if (!query) {
      onClick(!isInputExpanded);
    }

    handleButtonClick();
  };

  useEffect(() => {
    setQuery(searchParams.get(SearchParamsNames.query) || '');
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!formRef.current) {
        return;
      }

      const isCLickOutside =
        e.target &&
        e.target instanceof HTMLElement &&
        e.target !== buttonRef.current &&
        !formRef.current.contains(e.target) &&
        isInputExpanded;

      if (isInputExpanded && isCLickOutside) {
        onClick(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClick, isInputExpanded]);

  return (
    <form className={cn(classNames, 'search-bar')} ref={formRef}>
      <input
        type="text"
        value={query}
        className={cn('search-bar__input', {
          'search-bar__input--small-screen': !isInputExpanded,
        })}
        placeholder={placeholder}
        onChange={handleChange}
        ref={inputRef}
      />

      <button
        type="button"
        className="search-bar__button
        search-bar__button--on-big-screen"
        onClick={() => handleButtonClick()}
      >
        <Icon
          iconName={!query ? 'search' : 'close'}
          classNames="search-bar__icon"
          data-cy={query && 'searchDelete'}
        />
      </button>

      <button
        type="button"
        className="search-bar__button
        search-bar__button--on-small-screen"
        onClick={() => handleSmallScreenButtonClick()}
        ref={buttonRef}
      >
        <Icon
          iconName={!query ? 'search' : 'close'}
          classNames="search-bar__icon"
          data-cy={query && 'searchDelete'}
        />
      </button>
    </form>
  );
};
