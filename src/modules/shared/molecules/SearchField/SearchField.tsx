import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from '../../atoms/Icon';
import { SearchIcon } from '../../../../assets/icons/search-icon';
import styles from './SearchField.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchParam } from '../../../../enums/SearchFields';
import { DefaultValues } from '../../../../enums/DefaultValues';
import { getSearchWith } from '../../../../helpers/searchHelper';
import debounce from 'lodash.debounce';
import classNames from 'classnames';

export const SearchField: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery =
    searchParams.get(SearchParam.Query) || DefaultValues.Query;
  const [query, setQuery] = useState(initialQuery);

  const updateQuery = useCallback(
    (value: string) => {
      const updatedSearch = getSearchWith(searchParams, {
        [SearchParam.Query]: value || null,
        [SearchParam.Page]: null,
      });

      navigate({ search: updatedSearch });
    },
    [searchParams, navigate],
  );

  const debouncedUpdateQuery = useMemo(
    () => debounce(updateQuery, 300),
    [updateQuery],
  );

  useEffect(() => {
    return () => {
      debouncedUpdateQuery.cancel();
    };
  }, [debouncedUpdateQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debouncedUpdateQuery(event.target.value);
  };

  return (
    <div className={classNames(styles.search, 'search_field_container')}>
      <label htmlFor="searchInput">
        <Icon color="secondary">
          <SearchIcon />
        </Icon>
      </label>
      <input
        type="text"
        id="searchInput"
        placeholder={`${t('search.placeholder')}...`}
        className={styles.input}
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};
