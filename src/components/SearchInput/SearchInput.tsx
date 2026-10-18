import { useEffect, useState } from 'react';
import { useDebouncedCallback } from '../../hooks';
import { Icon } from '../Icon';
import styles from './SearchInput.module.scss';

const DEBOUNCE_DELAY = 500;

interface Props {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, placeholder, onChange }: Props) => {
  const [text, setText] = useState(value);
  const applyQuery = useDebouncedCallback(onChange, DEBOUNCE_DELAY);

  useEffect(() => setText(value), [value]);

  const handleChange = (newText: string) => {
    setText(newText);
    applyQuery(newText);
  };

  return (
    <div className={styles['search-input']}>
      <input
        type="search"
        aria-label={placeholder}
        className={styles['search-input__field']}
        value={text}
        placeholder={placeholder}
        onChange={event => handleChange(event.target.value)}
      />
      <span className={styles['search-input__icon']}>
        <Icon name="search" />
      </span>
    </div>
  );
};
