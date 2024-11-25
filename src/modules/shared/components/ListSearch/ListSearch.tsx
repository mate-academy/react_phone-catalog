import { useEffect, useId, useRef, useState } from 'react';
import { useListControls } from '../../hooks/useListControls';
import styles from './ListSearch.module.scss';
import classNames from 'classnames';
import { useLanguage } from '../Contexts/LanguageContext';

type Props = {
  className?: string;
};

export const ListSearch: React.FC<Props> = ({ className }) => {
  const id = useId();
  const { searchLabel } = useLanguage().localeTexts;
  const { search, setListControls } = useListControls();
  const [searchInput, setSearchInput] = useState(search);
  const timeoutId = useRef(0);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.currentTarget.value;

    setSearchInput(newSearch);

    window.clearTimeout(timeoutId.current);

    timeoutId.current = window.setTimeout(() => {
      setListControls({ search: newSearch, page: 1 });
    }, 600);
  };

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  return (
    <article className={classNames(styles.ListSearch, className)}>
      <label htmlFor={id} className={styles.Label}>
        {searchLabel}
      </label>

      <input
        id={id}
        type="text"
        placeholder={`${searchLabel}...`}
        value={searchInput}
        onChange={handleSearchChange}
        className={styles.Input}
      />
    </article>
  );
};
