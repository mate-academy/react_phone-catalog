import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_SORT_BY,
  ITEMS_PER_PAGE_OPTIONS,
  SORT_OPTIONS,
} from '../../../../constants';
import { SearchParam } from '../../../../types';

import { Dropdown, SearchInput } from './components';

import styles from './Filters.module.scss';

type Props = {
  className?: string;
};

export const Filters: React.FC<Props> = ({ className = '' }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByParam = searchParams.get(SearchParam.SortBy) || DEFAULT_SORT_BY;
  const itemsPerPageParam =
    searchParams.get(SearchParam.ItemsPerPage) || DEFAULT_ITEMS_PER_PAGE;
  const query = searchParams.get(SearchParam.Query) || '';

  const handleParamChange = (
    param: SearchParam,
    value: string,
    defaultValue: string,
  ) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === defaultValue) {
      newParams.delete(param);
    } else {
      newParams.set(param, value);
    }

    newParams.delete(SearchParam.Page);

    setSearchParams(newParams);
  };

  return (
    <div className={classNames(styles.filters, className)}>
      <Dropdown
        label="Sort By"
        options={SORT_OPTIONS}
        value={sortByParam}
        onChange={value =>
          handleParamChange(SearchParam.SortBy, value, DEFAULT_SORT_BY)
        }
        className={styles['filters__sort-by']}
      />
      <Dropdown
        label="Items per page"
        options={ITEMS_PER_PAGE_OPTIONS}
        value={itemsPerPageParam}
        onChange={value =>
          handleParamChange(
            SearchParam.ItemsPerPage,
            value,
            DEFAULT_ITEMS_PER_PAGE,
          )
        }
        className={styles['filters__items-per-page']}
      />
      <SearchInput
        label="Search"
        value={query}
        onChange={value => handleParamChange(SearchParam.Query, value, '')}
        className={styles['filters__search-input']}
      />
    </div>
  );
};
