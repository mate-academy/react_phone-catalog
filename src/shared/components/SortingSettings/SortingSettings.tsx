import { useContext, useEffect, useState } from 'react';
import styles from './SortingSettings.module.scss';
import { useSearchParams } from 'react-router-dom';
import arrowDown from './icons/arrowDown.svg';
import arrowUp from './icons/arrowUp.svg';
import classNames from 'classnames';
import { AppContext } from '../../../utils/AppContext';

export enum SortBy {
  age = 'age',
  title = 'title',
  price = 'price',
}

function setSortByField(v: string) {
  switch (v) {
    case 'age':
      return 'Newest';
    case 'title':
      return 'Alphabetically';
    case 'price':
      return 'Cheapest';
    default:
      return;
  }
}

export const SortingSettings = () => {
  const [isSettingSortBy, setIsSettingSortBy] = useState(false);
  const [isSettingPerPage, setIsSettingPerPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkTheme } = useContext(AppContext);

  const sortBy = searchParams.get('sortBy') || '';
  const perPage = searchParams.get('perPage') || '';

  const handleSetSorting = (key: string, value: string | number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set(key, value.toString());
    newParams.set('page', '1');

    setSearchParams(newParams);
  };

  useEffect(() => {
    if (!perPage || perPage === 'all' || +perPage > 16 || +perPage < 4) {
      const newParams = new URLSearchParams(searchParams);

      newParams.delete('perPage');
      newParams.delete('page');

      setSearchParams(newParams);
    }

    if (!sortBy) {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('sortBy', 'age');

      setSearchParams(newParams);
    }
  }, [perPage, searchParams, setSearchParams, sortBy]);

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.sortingFields}>
        <div className={styles.sortingField}>
          <span
            className={classNames(
              styles.sortingField__info,
              isDarkTheme ? styles.sortingField__infoDark : '',
            )}
          >
            Sort by
          </span>

          <div
            className={classNames(
              styles.sortingField__select,
              isDarkTheme ? styles.sortingField__selectDark : '',
              styles.sortingField__sortBy,
            )}
            tabIndex={0}
            onClick={() => setIsSettingSortBy(!isSettingSortBy)}
            onBlur={() => setTimeout(() => setIsSettingSortBy(false), 200)}
          >
            {setSortByField(sortBy)}

            <div
              className={styles.sortingField__selectIcon}
              style={{
                backgroundImage: isSettingSortBy
                  ? `url(${arrowUp})`
                  : `url(${arrowDown})`,
              }}
            ></div>
          </div>

          <ul
            className={classNames(
              styles.sortingField__options,
              isDarkTheme ? styles.sortingField__optionsDark : '',
              isSettingSortBy ? '' : styles.hide,
            )}
          >
            <li
              className={classNames(
                styles.sortingField__option,
                isDarkTheme ? styles.sortingField__optionDark : '',
              )}
              onClick={() => handleSetSorting('sortBy', SortBy.age)}
            >
              Newest
            </li>
            <li
              className={classNames(
                styles.sortingField__option,
                isDarkTheme ? styles.sortingField__optionDark : '',
              )}
              onClick={() => handleSetSorting('sortBy', SortBy.title)}
            >
              Alphabetically
            </li>
            <li
              className={classNames(
                styles.sortingField__option,
                isDarkTheme ? styles.sortingField__optionDark : '',
              )}
              onClick={() => handleSetSorting('sortBy', SortBy.price)}
            >
              Cheapest
            </li>
          </ul>
        </div>

        <div className={styles.sortingField}>
          <span
            className={classNames(
              styles.sortingField__info,
              isDarkTheme ? styles.sortingField__infoDark : '',
            )}
          >
            Items on page
          </span>

          <div
            className={classNames(
              styles.sortingField__select,
              isDarkTheme ? styles.sortingField__selectDark : '',
              styles.sortingField__perPage,
            )}
            tabIndex={0}
            onClick={() => setIsSettingPerPage(!isSettingPerPage)}
            onBlur={() => setTimeout(() => setIsSettingPerPage(false), 200)}
          >
            {perPage ? perPage : 'All'}

            <div
              className={styles.sortingField__selectIcon}
              style={{
                backgroundImage: isSettingPerPage
                  ? `url(${arrowUp})`
                  : `url(${arrowDown})`,
              }}
            ></div>
          </div>

          <ul
            className={classNames(
              styles.sortingField__options,
              isDarkTheme ? styles.sortingField__optionsDark : '',
              isSettingPerPage ? '' : styles.hide,
            )}
          >
            <li
              className={classNames(
                styles.sortingField__option,
                isDarkTheme ? styles.sortingField__optionDark : '',
              )}
              onClick={() => handleSetSorting('perPage', 4)}
            >
              4
            </li>
            <li
              className={classNames(
                styles.sortingField__option,
                isDarkTheme ? styles.sortingField__optionDark : '',
              )}
              onClick={() => handleSetSorting('perPage', 8)}
            >
              8
            </li>
            <li
              className={classNames(
                styles.sortingField__option,
                isDarkTheme ? styles.sortingField__optionDark : '',
              )}
              onClick={() => handleSetSorting('perPage', 16)}
            >
              16
            </li>
            <li
              className={classNames(
                styles.sortingField__option,
                isDarkTheme ? styles.sortingField__optionDark : '',
              )}
              onClick={() => handleSetSorting('perPage', 'all')}
            >
              All
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
