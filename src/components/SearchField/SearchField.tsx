import './SearchField.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import close from '../../images/icons/close.svg';
import closeDark from '../../images/icons/close_dark.svg';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';

export const SearchField = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQueery] = useState<string>(searchParams.get('query') || '');
  const firstRender = useRef(true);
  const titleField = useRef<HTMLInputElement>(null);
  const { theme } = useAppSelector(state => state.theme);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((params: URLSearchParams) => {
      setSearchParams(params);
    }, 1000),
    [searchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    params.set('page', '1');
    params.set('trans', '0');
    params.set('group', '0');

    debouncedSearch(params);
    setQueery(event.target.value);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);

    params.set('query', '');
    params.set('page', '1');
    params.set('trans', '0');
    params.set('group', '0');

    setSearchParams(params);
    setQueery('');
  };

  const location = useLocation();
  let categorySearch = location.pathname.slice(1);

  const { t } = useTranslation();

  const categoryTrans = (category: string) => {
    if (category === 'accessories') {
      return (categorySearch = t('searchField.category.accessories'));
    }

    if (category === 'phones') {
      return (categorySearch = t('searchField.category.phones'));
    }

    if (category === 'tablets') {
      return (categorySearch = t('searchField.category.tablets'));
    } else {
      return category;
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }

    setQueery('');
  }, [location.pathname]);

  return (
    <div className="searchField">
      <label
        htmlFor="search"
        className={classNames('searchField__content', {
          focus: query.length > 0,
        })}
      >
        <input
          id="search"
          type="text"
          autoComplete="off"
          ref={titleField}
          className="searchField__input"
          placeholder={t('searchField.title', {
            category: categoryTrans(categorySearch),
          })}
          value={query}
          onChange={handleQueryChange}
        />
        {query && (
          <div className="searchField__close" onClick={handleClear}>
            <img
              src={theme === 'light-theme' ? close : closeDark}
              alt="Close"
              className="searchField__close-img"
            />
          </div>
        )}
      </label>
    </div>
  );
};
