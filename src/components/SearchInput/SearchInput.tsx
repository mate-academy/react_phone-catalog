import { Icon } from '../Icon';
import styles from './SearchInput.module.scss';

type Props = {
  value: string;
  placeholder?: string;
  clearLabel?: string;
  className?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
};

export const SearchInput = ({
  value,
  placeholder = 'Search',
  clearLabel = 'Clear search',
  className = '',
  onChange,
  onClear,
}: Props) => {
  const rootClassName = [styles.searchInput, className]
    .filter(Boolean)
    .join(' ');

  const handleClear = () => {
    onClear?.();
  };

  return (
    <label className={rootClassName}>
      <input
        className={styles.input}
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
        onChange={event => onChange(event.target.value)}
      />

      {value && (
        <button
          className={styles.clearButton}
          type="button"
          aria-label={clearLabel}
          onClick={handleClear}
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </label>
  );
};
