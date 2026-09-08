import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import styles from './SearchInput.module.scss';
import classNames from 'classnames';
type Props = {
  active: boolean;
};
export const SearchInput: React.FC<Props> = ({ active }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [inputValue, setInputValue] = useState(initialQuery);

  const debouncedSetQuery = debounce((value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);
    debouncedSetQuery(value);
  };

  useEffect(() => {
    setInputValue(initialQuery);
  }, [initialQuery]);

  return (
    <input
      className={classNames(styles.searchInput, {
        [styles['searchInput--is-active']]: active,
      })}
      type="search"
      placeholder="Search..."
      onChange={handleChange}
    />
  );
};
