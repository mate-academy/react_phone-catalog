/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FC, useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import {
  useSearchParams, useLocation, useParams,
} from 'react-router-dom';
import cn from 'classnames';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Styles } from '../../types/Styles';

type Debounce = (
  func: (args: any) => void, wait: number
) => (value: any) => void;

const debounce: Debounce = require('../../../node_modules/lodash.debounce');

const styles: Styles = require('./SearchBar.module.scss');

const {
  SearchBar: searchBar,
  'SearchBar__clear-button': clearButton,
  'SearchBar__clear-button--hidden': clearButtonHidden,
  SearchBar__input: input,
  'SearchBar__input--dark': inputDark,
  'SearchBar__input-container': inputContainer,
  'SearchBar__input-container--hidden': inputContainerHidden,
  SearchBar__button: button,
  'SearchBar__button--dark': buttonDark,
} = styles;

type Props = {
  className?: string;
};

export const SearchBar: FC<Props> = ({ className = '' }) => {
  const { theme, isThemeDark } = useContext(ThemeContext);
  const [isInputHidden, setIsInputHidden] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { category } = useParams();

  const appliedQuery = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';

  const [query, setQuery] = useState(appliedQuery);

  const location = useLocation();

  const handleQueryChange = (value: string) => {
    if (page !== '1') {
      searchParams.set('page', '1');
    }

    if (value.trim()) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  const handleInputToggle = () => {
    setIsInputHidden(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  };

  const handleQueryClear = () => {
    searchParams.delete('query');
    setQuery('');

    if (page !== '1') {
      searchParams.set('page', '1');
    }

    setSearchParams(searchParams);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleQueryClear();

      return;
    }

    if (e.key === 'Enter') {
      setIsInputHidden(true);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isInputHidden) {
        return;
      }

      const target = e.target as HTMLElement;

      if (!searchBarRef.current?.contains(target)) {
        setIsInputHidden(true);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isInputHidden]);

  useEffect(() => {
    setQuery('');
  }, [location.pathname]);

  const handleQueryChangeDebounced = useCallback(
    debounce(handleQueryChange, 1000),
    [category],
  );

  return (
    <div
      className={cn(
        className,
        searchBar,
      )}
    >
      <div
        ref={searchBarRef}
        className={cn(
          inputContainer,
          { [inputContainerHidden]: isInputHidden },
        )}
      >
        <input
          ref={inputRef}
          className={cn(
            input,
            { [inputDark]: isThemeDark },
          )}
          type="text"
          placeholder={`Search in ${category}...`}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleQueryChangeDebounced(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />

        <button
          className={cn(
            clearButton,
            { [clearButtonHidden]: !query },
          )}
          type="button"
          onClick={handleQueryClear}
        >
          <img
            src={`./icons/Close_${theme}.svg`}
            alt="Clear"
          />
        </button>

      </div>

      <button
        className={cn(
          button,
          { [buttonDark]: isThemeDark },
        )}
        type="button"
        onClick={handleInputToggle}
      >
        <img
          src={`./icons/Search_${theme}.svg`}
          alt="Search"
        />
      </button>
    </div>
  );
};

SearchBar.defaultProps = {
  className: '',
};
