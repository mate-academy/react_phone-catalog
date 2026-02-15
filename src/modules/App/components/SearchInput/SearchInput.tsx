import classNames from 'classnames';
import { useLocation, useSearchParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';

import { useDebounce } from '@hooks/useDebounce';

import styles from './SearchInput.module.scss';
import { useAppSelector } from '@store/hooks';
import { Theme } from '@sTypes/Theme';

type Props = {
  className?: string;
};

export const SearchInput: React.FC<Props> = ({ className }) => {
  const { pathname } = useLocation();
  const theme = useAppSelector(state => state.theme);

  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('query') || '');

  useEffect(() => {
    setQuery(params.get('query') || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const saveQueryCallback = useCallback(
    (newQuery: string) => {
      const newParams = new URLSearchParams(params);

      if (newQuery) {
        newParams.set('query', newQuery);
      } else {
        newParams.delete('query');
      }

      setParams(newParams);
    },
    [params, setParams],
  );

  const [saveQuery] = useDebounce(saveQueryCallback, 300);

  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;

      setQuery(newQuery);
      saveQuery(newQuery.toLowerCase().trim());
    },
    [saveQuery],
  );

  return (
    <input
      type="search"
      placeholder="Enter the product name..."
      className={classNames(className, styles['search-input'], {
        [styles['search-input--dark']]: theme === Theme.dark,
      })}
      value={query}
      onChange={handleQueryChange}
    />
  );
};
