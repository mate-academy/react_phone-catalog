import classNames from 'classnames';
import { Icon } from '../ui/Icon';
import styles from './CustomSearch.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'debounce';

type CustomSearchProps = {
  isShow: boolean;
  onShow: (value: boolean) => void;
};

export const CustomSearch: React.FC<CustomSearchProps> = ({
  isShow,
  onShow,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef<string>('');

  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const category = location.pathname.slice(1);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    queryRef.current = searchQuery; // Update ref whenever searchQuery changes
  }, [searchQuery]);

  const toggleSearchShow = () => {
    onShow(!isShow);
  };

  const handleAppliedSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (params.get('page') !== '1') {
      params.delete('page');
    }

    if (value === '') {
      params.delete('query');
    } else {
      params.set('query', value);
    }

    setSearchParams(params.toString());
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(debounce(handleAppliedSearch, 300), [
    location.pathname,
  ]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normolizeValue = e.target.value.toLocaleLowerCase().trim();

    setSearchQuery(e.target.value);
    applyQuery(normolizeValue);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (queryRef.current.trim() !== '') {
      return; // Don't close if there is a query
    }

    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      iconRef.current &&
      !iconRef.current.contains(event.target as Node)
    ) {
      setSearchQuery('');
      onShow(false);
    }
  };

  useEffect(() => {
    if (isShow) {
      document.addEventListener('mousedown', handleClickOutside);
      inputRef.current?.focus();
    } else {
      setSearchQuery('');
      const params = new URLSearchParams(searchParams);

      params.delete('query');

      setSearchParams(params);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, [isShow]);

  return (
    <div className={styles['search-bar']}>
      <input
        ref={inputRef}
        value={searchQuery}
        onChange={handleQueryChange}
        type="search"
        className={classNames(styles['search-bar__input'], {
          [styles['search-bar__input--active']]: isShow,
        })}
        placeholder={`Search in ${category}...`}
      />

      <div
        ref={iconRef}
        className={styles['search-bar__icon']}
        onClick={toggleSearchShow}
      >
        <Icon iconName="search" />
      </div>
    </div>
  );
};
