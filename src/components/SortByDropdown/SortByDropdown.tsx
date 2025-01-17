import arrowRightLight from '../../images/icon-right-light-theme.svg';
import arrowRightDark from '../../images/icon-right-dark-theme.svg';
import { useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import i18next from 'i18next';
import classNames from 'classnames';
import styles from './SortByDropdown.module.scss';

export const SortByDropdown = () => {
  const { theme } = useAppSelector(state => state.theme);
  const { t } = useTranslation();
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    t('sortByDropdown.option.newest'),
    t('sortByDropdown.option.alphabetically'),
    t('sortByDropdown.option.cheapest'),
  ];

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownContainerRef.current &&
      !dropdownContainerRef.current.contains(event.target as Node)
    ) {
      setIsDropdownActive(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sort', option);
    setSearchParams(params);
    setIsDropdownActive(false);
  };

  const toggleDropdown = () => {
    setIsDropdownActive(prevState => !prevState);
  };

  const translateSortOption = (sort: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (sort === 'Найновіші' && i18next.language === 'en') {
      params.set('sort', 'Newest');
      setSearchParams(params);
    } else if (sort === 'Newest' && i18next.language === 'uk') {
      params.set('sort', 'Найновіші');
      setSearchParams(params);
    }

    if (sort === 'Алфавітом' && i18next.language === 'en') {
      params.set('sort', 'Alphabetically');
      setSearchParams(params);
    } else if (sort === 'Alphabetically' && i18next.language === 'uk') {
      params.set('sort', 'Алфавітом');
      setSearchParams(params);
    }

    if (sort === 'Найдешевші' && i18next.language === 'en') {
      params.set('sort', 'Cheapest');
      setSearchParams(params);
    } else if (sort === 'Cheapest' && i18next.language === 'uk') {
      params.set('sort', 'Найдешевші');
      setSearchParams(params);
    }

    return sort;
  };

  useEffect(() => {
    if (isDropdownActive) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDropdownActive]);

  return (
    <div className={styles.sortByDropdown} ref={dropdownContainerRef}>
      <label className={styles.sortByDropdown__label}>
        {t('sortByDropdown.title')}
      </label>

      <button
        className={styles.sortByDropdown__toggle}
        onClick={toggleDropdown}
      >
        <p className={styles.sortByDropdown__toggle__toggleText}>
          {searchParams.has('sort')
            ? translateSortOption(searchParams.get('sort'))
            : t('sortByDropdown.placeholder')}
        </p>
        <img
          src={theme === 'light' ? arrowRightLight : arrowRightDark}
          alt="Arrow Toggle"
          className={classNames(styles.sortByDropdown__toggle__toggleIcon, {
            [styles['sortByDropdown__toggle__toggleIcon--active']]:
              isDropdownActive,
          })}
        />
      </button>

      <ul
        className={classNames(styles.sortByDropdown__list, {
          [styles['sortByDropdown__list--active']]: isDropdownActive,
        })}
      >
        {sortOptions.map(option => (
          <li
            className={styles.sortByDropdown__item}
            key={option}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
