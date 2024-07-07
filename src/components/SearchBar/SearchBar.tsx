import debounce from 'lodash.debounce';
import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './SearchBar.module.scss';
import classNames from 'classnames';
import { getSearchIcon } from '../../utils/getIcons';
import { useTheme } from '../../context/ThemeContext';

export const SearchBar: React.FC = () => {
  const { theme } = useTheme();
  const searchIcon = getSearchIcon(theme);

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  const { pathname } = useLocation();

  const handleQueryChange = (value: string) => {
    const normalisedValue = value.trim().toLowerCase();
    const newQuery = new URLSearchParams(searchParams.toString());

    if (normalisedValue) {
      newQuery.set('query', normalisedValue);
    } else {
      newQuery.delete('query');
    }

    setSearchParams(newQuery);
  };

  const debounceQueryChange = debounce(handleQueryChange, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    debounceQueryChange(inputValue);
    setQuery(inputValue);
  };

  const isHidden =
    pathname === '/' ||
    pathname === '/favourites' ||
    pathname === '/cart' ||
    pathname.startsWith('/products/');

  return (
    <div className={classNames(styles.search, { [styles.hidden]: isHidden })}>
      <img src={searchIcon} />
      <input
        id="search"
        type="search"
        placeholder="Search..."
        className={styles.input}
        value={query}
        onChange={handleSearchChange}
      />
    </div>
  );
};
