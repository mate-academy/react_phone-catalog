import { useCallback, useEffect } from 'react';
import styles from './SearchBar.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hook';
import { setQuery } from '../../../../features/productsSlice';
import { debounce } from '@mui/material';
import { getSearchWith } from '../../../../helpers/searchHelper';
import { icons } from '../../../global/Icons';

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const applyQuery = useCallback(
    debounce(value => {
      dispatch(setQuery(value));
    }, 1000),
    [dispatch, setQuery],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    const newSearchParam = getSearchWith(searchParams, {
      query: newValue || null,
    });

    setSearchParams(newSearchParam);

    applyQuery(newValue);
  };

  const handleClearQuery = () => {
    setQuery('');

    const newSearchParam = getSearchWith(searchParams, {
      query: null,
    });

    setSearchParams(newSearchParam);
    dispatch(setQuery(''));
  };

  useEffect(() => {
    applyQuery(query);
  }, [query, applyQuery]);

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search..."
        className={styles.search}
      />

      {query !== '' && (
        <span className={styles.btnClose} onClick={handleClearQuery}>
          {icons.close}
        </span>
      )}
    </div>
  );
};
