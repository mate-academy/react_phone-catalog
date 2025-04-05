import { useState } from 'react';
import styles from './SearchInput.module.scss';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.BASE_URL || '/';
const iconSrc = `${BASE_URL}/img/icons/search.svg`;

const SearchInput: React.FC = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleClickSearch = () => {
    if (!value.trim()) {
      return;
    }

    const params = new URLSearchParams({ query: value.trim() });

    navigate(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClickSearch();
    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.search__wrapper}>
        <input
          className={styles.search__input}
          type="text"
          placeholder="Search..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          aria-label="Search"
          onClick={handleClickSearch}
          className={styles.search__icon}
        >
          <img src={iconSrc} alt="search icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
