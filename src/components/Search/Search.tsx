import searchLogoDarkTheme from '../../images/icon-search-dark-theme.svg';
import searchLogoLightTheme from '../../images/icon-search-light-theme.svg';
import { useAppSelector } from '../../hooks/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash/debounce';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import closeLight from '../../images/icon-close-light-theme.svg';
import closeDark from '../../images/icon-close-dark-theme.svg';
import styles from './Search.module.scss';
import { useTranslation } from 'react-i18next';

export const Search = () => {
  const { theme } = useAppSelector(state => state.theme);
  const location = useLocation();
  const firstRender = useRef(true);
  const titleField = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get('search') || '');

  const categorySearch = location.pathname.slice(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((params: URLSearchParams) => {
      setSearchParams(params);
    }, 2000),
    [searchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    const params = new URLSearchParams(searchParams);

    params.set('search', searchValue);
    params.set('page', '1');
    params.set('section', '0');
    params.set('offset', '0');

    debouncedSearch(params);
    setQuery(searchValue);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);

    params.set('search', '');
    params.set('page', '1');
    params.set('section', '0');
    params.set('offset', '0');

    setSearchParams(params);
    setQuery('');
  };

  const categoryTrans = (category: string) => {
    if (category === 'accessories') {
      return t('search.placeholder', {
        category: t('search.categories.accessories'),
      });
    }

    if (category === 'phones') {
      return t('search.placeholder', {
        category: t('search.categories.phones'),
      });
    }

    if (category === 'tablets') {
      return t('search.placeholder', {
        category: t('search.categories.tablets'),
      });
    } else {
      return t('search.placeholder', { category });
    }
  };

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    setQuery('');
  }, [location.pathname]);

  return (
    <div className={styles.search}>
      <label
        htmlFor="search"
        className={classNames(styles.search__content, {
          [styles.focus]: query.length > 0,
        })}
      >
        <div className={styles.search__inputWrapper}>
          <img
            src={theme === 'light' ? searchLogoLightTheme : searchLogoDarkTheme}
            alt="Search"
            className={styles.search__icon}
          />
          <input
            id="search"
            type="text"
            autoComplete="off"
            ref={titleField}
            className={styles.search__input}
            placeholder={categoryTrans(categorySearch)}
            value={query}
            onChange={handleQueryChange}
          />
        </div>

        {query && (
          <div className={styles.search__close} onClick={handleClear}>
            <img
              src={theme === 'light' ? closeLight : closeDark}
              alt="Close"
              className={styles.search__close_img}
            />
          </div>
        )}
      </label>
    </div>
  );
};
