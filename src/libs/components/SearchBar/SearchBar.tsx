/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
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
  const [value, setValue] = useState(
    searchParams.get(SearchParamsNames.query) || '',
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();

  const placeholder = `Search in ${pathname.split('/')[1]}`;

  const handleSetParams = (
    paramValue: string,
  ) => {
    const newParams = getSearchWith(
      { [SearchParamsNames.query]: paramValue || null },
      searchParams,
    );

    setSearchParams(newParams);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSetParams(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleReset = () => {
    setValue('');
    searchParams.delete(SearchParamsNames.query);
    setSearchParams(searchParams);
  };

  const handleButtonClick = () => {
    if (!value) {
      inputRef.current?.focus();
    }

    if (value) {
      handleReset();
    }
  };

  const handleSmallScreenButtonClick = () => {
    if (!value) {
      onClick(!isInputExpanded);
    }

    handleButtonClick();
  };

  useEffect(() => {
    setValue(searchParams.get(SearchParamsNames.query) || '');
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!formRef.current) {
        return;
      }

      const isCLickOutside = (
        e.target
        && e.target instanceof HTMLElement
        && e.target !== buttonRef.current
        && !formRef.current.contains(e.target)
        && isInputExpanded
      );

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
    <form
      className={cn(classNames, 'search-bar')}
      onSubmit={handleSubmit}
      ref={formRef}
    >

      <input
        type="text"
        value={value}
        className={cn(
          'search-bar__input',
          { 'search-bar__input--small-screen': !isInputExpanded },
        )}
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
          iconName={!value ? 'search' : 'close'}
          classNames="search-bar__icon"
          data-cy={value && 'searchDelete'}
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
          iconName={!value ? 'search' : 'close'}
          classNames="search-bar__icon"
          data-cy={value && 'searchDelete'}
        />
      </button>
    </form>
  );
};
