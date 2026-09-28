import React, { useState } from 'react';
import { Icon } from '../Icon';
import styles from './SearchInput.module.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder = 'Search',
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
    onChange(event.target.value);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className={styles.wrapper}>
      <Icon name="search" size={18} className={styles.icon} />
      <input
        type="search"
        className={styles.input}
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
      />
      {localValue && (
        <button
          type="button"
          className={styles.clear}
          aria-label="Clear search"
          onClick={handleClear}
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  );
};
