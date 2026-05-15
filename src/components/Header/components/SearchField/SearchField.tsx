import { useSearchParams } from 'react-router-dom';
import { Icon } from '../../../Icon';
import styles from './SearchField.module.scss';
import { useEffect, useState } from 'react';

export const SearchField = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('query') || '';
  const [value, setValue] = useState(queryFromUrl);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set('query', value);
      } else {
        params.delete('query');
      }

      setSearchParams(params);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, setSearchParams, searchParams]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.searchField}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search..."
        value={value}
        onChange={handleSearchChange}
      />

      <div className={styles.iconWrapper}>
        <Icon variant="search" />
      </div>
    </div>
  );
};
