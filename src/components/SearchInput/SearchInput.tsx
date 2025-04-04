import { useState } from 'react';
import styles from './SearchInput.module.scss';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.BASE_URL || '/';

type Props = {};

const SearchInput: React.FC<Props> = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleClickSearch = () => {
    const params = new URLSearchParams();

    params.set('query', value);
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
        <button onClick={handleClickSearch} className={styles.search__icon}>
          <img src={`${BASE_URL}/img/icons/search.svg`} alt="search icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
