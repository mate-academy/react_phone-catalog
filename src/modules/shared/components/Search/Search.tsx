import classNames from 'classnames';
import styles from './Search.module.scss';
import { useEffect, useRef } from 'react';

type Props = {
  value: string;
  onSearchChange: (value: string) => void;
  onBlur: () => void;
  searchOpen: boolean;
};

export const Search: React.FC<Props> = ({
  value,
  onSearchChange,
  onBlur,
  searchOpen,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchOpen]);

  return (
    <div
      className={classNames(styles.search, {
        [styles.search__active]: searchOpen,
      })}
    >
      <input
        type="search"
        ref={inputRef}
        className={styles.search__input}
        value={value}
        onBlur={onBlur}
        onChange={event => onSearchChange(event.target.value)}
        placeholder="Search products..."
      ></input>
    </div>
  );
};
