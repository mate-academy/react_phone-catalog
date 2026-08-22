import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { debounce } from '../../../../utils/debounce';
import { getSearchWith } from '../../../../utils/getSearchWith';
import { Icon } from '../Icon';
import styles from './SearchField.module.scss';

type Props = {
  placeholder?: string;
};

export const SearchField: React.FC<Props> = ({ placeholder = 'Search' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('query') || '');

  const applyQuery = useMemo(
    () =>
      debounce((query: string) => {
        setSearchParams(
          getSearchWith(searchParams, { query: query || null, page: null }),
        );
      }, 500),
    [searchParams, setSearchParams],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = event.target;

    setValue(newValue);
    applyQuery(newValue);
  };

  return (
    <div className={styles.search}>
      <Icon name="search" className={styles.search__icon} />
      <input
        type="search"
        className={styles.search__input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        data-cy="searchField"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          className={styles.search__clear}
          onClick={() => {
            setValue('');
            setSearchParams(
              getSearchWith(searchParams, { query: null, page: null }),
            );
          }}
        >
          <Icon name="close" />
        </button>
      )}
    </div>
  );
};
