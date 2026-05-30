import classNames from 'classnames';
import styles from './SearchField.module.scss';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../../../contexts/LanguageContext';

export const SearchField = () => {
  const { t } = useLanguage();
  const [, setSearchParams] = useSearchParams();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [canSearch, setCanSearch] = useState<boolean>(true);
  const [userSearch, setUserSearch] = useState<string>('');

  const handleSearching = () => {
    if (canSearch) {
      setIsSearching(prev => !prev);
      setCanSearch(false);
    }
  };

  useEffect(() => {
    if (userSearch) {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);

        next.set('search', userSearch);

        return next;
      });
    } else {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);

        next.delete('search');

        return next;
      });
    }
  }, [setSearchParams, userSearch]);

  useEffect(() => {
    if (canSearch) {
      return;
    }

    const cooldown = setTimeout(() => setCanSearch(true), 200);

    return () => clearTimeout(cooldown);
  }, [canSearch]);

  return (
    <div
      className={classNames(styles.searchBox__Container, {
        [styles.searchBox__ContainerActive]: isSearching,
      })}
    >
      <div
        className={styles.searchBox__IconContainer}
        onClick={() => {
          handleSearching();
        }}
      >
        <Search />
      </div>

      <input
        placeholder={t('catalog.searchPlaceholder')}
        value={userSearch}
        className={classNames(styles.searchBox__InputContainer, {
          [styles.searchBox__InputContainerActive]: isSearching,
        })}
        onChange={e => setUserSearch(e.target.value)}
      />
    </div>
  );
};
