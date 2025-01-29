import arrowRightLight from '../../images/icon-right-light-theme.svg';
import arrowRightDark from '../../images/icon-right-dark-theme.svg';
import { useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ItemsPerPageDropdown.module.scss';

export const ItemsPerPageDropdown = () => {
  const { theme } = useAppSelector(state => state.theme);
  const { t } = useTranslation();
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const sortOptions: string[] = ['4', '8', '16', t('itemsPerPageDropdown.all')];

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownContainerRef.current &&
      !dropdownContainerRef.current.contains(event.target as Node)
    ) {
      setIsDropdownActive(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownActive(prevState => !prevState);
  };

  const handleOptionSelect = (option: string) => {
    const params = new URLSearchParams(searchParams);

    if (option === t('itemsPerPageDropdown.all')) {
      params.delete('perPage');
      params.delete('page');
    } else {
      params.set('perPage', option);
    }

    setSearchParams(params);
    setIsDropdownActive(false);
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
    <div className={styles.itemsPerPageDropdown} ref={dropdownContainerRef}>
      <label className={styles.itemsPerPageDropdown__label}>
        {t('itemsPerPageDropdown.title')}
      </label>

      <button
        className={styles.itemsPerPageDropdown__toggle}
        onClick={toggleDropdown}
      >
        <p className={styles.itemsPerPageDropdown__toggle__toggleText}>
          {searchParams.has('perPage')
            ? searchParams.get('perPage')
            : `${t('itemsPerPageDropdown.all')}`}
        </p>
        <img
          src={theme === 'light' ? arrowRightLight : arrowRightDark}
          alt="Arrow Toggle"
          className={classNames(
            styles.itemsPerPageDropdown__toggle__toggleIcon,
            {
              [styles['itemsPerPageDropdown__toggle__toggleIcon--active']]:
                isDropdownActive,
            },
          )}
        />
      </button>

      <ul
        className={classNames(styles.itemsPerPageDropdown__list, {
          [styles['itemsPerPageDropdown__list--active']]: isDropdownActive,
        })}
      >
        {sortOptions.map(option => (
          <li
            className={styles.itemsPerPageDropdown__item}
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
