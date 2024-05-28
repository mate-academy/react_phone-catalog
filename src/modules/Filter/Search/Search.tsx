import React, { useCallback, useEffect, useState } from 'react';
import { SortVariants } from '../../../utils/enums/sortVariants';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';

type Props = {
  queryParams: SortVariants;
  label: string;
};

export const Search: React.FC<Props> = ({ label, queryParams }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(queryParams) || '';
  const [appliedQuery, setAppliedQuery] = useState(query);

  const [value, setValue] = useState(query);

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    applyQuery(e.target.value);
  };

  useEffect(() => {
    searchParams.set(queryParams, appliedQuery);
    if (!appliedQuery.trim()) {
      searchParams.delete(queryParams);

      setValue('');
      applyQuery('');
    }

    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, [appliedQuery, applyQuery]);

  return (
    <div className={styles.search}>
      <h4 className={styles.Search_label}>{label}</h4>
      <input
        type="search"
        value={value}
        onChange={handleQueryChange}
        className={styles.Search_input}
        placeholder={label}
      />
    </div>
  );
};
