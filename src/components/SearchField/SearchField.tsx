import { FiSearch } from 'react-icons/fi';
import styles from './SearchField.module.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type SearchFieldProps = {
  height?: string;
  marginTop?: string;
  debounce?: number;
};

export const SearchField = ({
  height,
  marginTop,
  debounce = 300,
}: SearchFieldProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('');

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (value) {
        newParams.set('query', value);
      } else {
        newParams.delete('query');
      }

      setSearchParams(newParams, { replace: true });
    }, debounce);

    return () => clearTimeout(debounceTimeout);
  }, [value, searchParams, setSearchParams, debounce]);

  useEffect(() => {
    const query = searchParams.get('query') || '';

    setValue(query);
  }, [searchParams]);

  return (
    <div
      className={styles.container}
      style={{
        ...(height ? { height } : {}),
        ...(marginTop ? { marginTop } : {}),
      }}
    >
      <FiSearch />
      <input
        type="text"
        placeholder="Search product..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};
