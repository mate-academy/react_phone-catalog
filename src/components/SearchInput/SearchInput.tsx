import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '../Icon';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './SearchInput.module.scss';

type Props = {
  placeholder: string;
};

export const SearchInput = ({ placeholder }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('query') || '');
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (debouncedValue) {
      newParams.set('query', debouncedValue);
    } else {
      newParams.delete('query');
    }

    newParams.delete('page');

    setSearchParams(newParams, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <label className={styles.wrapper}>
      <Icon name="search" className={styles.icon} />
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={() => setValue('')}
          aria-label="Clear search"
        >
          <Icon name="close" />
        </button>
      )}
    </label>
  );
};
