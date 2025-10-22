import React from 'react';
import styles from './SearchInput.module.scss';
import searchIcon from '../../images/icons/search.svg';

interface SearchInputProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles['search-input-container']}>
      {/* Іконка лупи */}
      <span className={styles['search-icon']}>
        <img
          className={styles['search-icon-img']}
          src={searchIcon}
          alt="favourites heart"
        />
      </span>

      <input
        type="text"
        className={styles['search-input']}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
