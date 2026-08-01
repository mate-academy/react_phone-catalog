import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDebounce } from '@shared/hooks';
import { closeIcon } from '@shared/assets/icons';
import styles from './Search.module.scss';

const DEBOUNCE_DELAY = 400;

interface Props {
  placeholder: string;
  clearLabel: string;
}

export const Search: React.FC<Props> = ({ placeholder, clearLabel }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  // The field updates on every keystroke; the URL follows once typing stops.
  const [value, setValue] = useState(() => searchParams.get('query') ?? '');
  const debouncedValue = useDebounce(value, DEBOUNCE_DELAY);

  const previousPath = useRef(pathname);

  // Router rebuilds `setSearchParams` whenever the URL changes, so the effect
  // below reruns after params it knows nothing about move. Remembering the
  // query it last wrote keeps those reruns from dropping the `page` just set.
  const appliedQuery = useRef(searchParams.get('query') ?? '');

  // A query typed for one category means nothing on the next one.
  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      appliedQuery.current = '';
      setValue('');
    }
  }, [pathname]);

  useEffect(() => {
    const query = debouncedValue.trim();

    if (appliedQuery.current === query) {
      return;
    }

    appliedQuery.current = query;

    setSearchParams(
      current => {
        const next = new URLSearchParams(current);

        if (query) {
          next.set('query', query);
        } else {
          next.delete('query');
        }

        // A narrower list can have fewer pages than the one being viewed.
        next.delete('page');

        return next;
      },
      { replace: true },
    );
  }, [debouncedValue, setSearchParams]);

  return (
    <div className={styles.search}>
      <input
        type="search"
        className={styles.input}
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={event => setValue(event.target.value)}
      />

      {value ? (
        <button
          type="button"
          className={styles.clear}
          aria-label={clearLabel}
          onClick={() => setValue('')}
        >
          <img src={closeIcon} alt="" className="icon" />
        </button>
      ) : (
        <span className={styles.glass} aria-hidden="true" />
      )}
    </div>
  );
};
