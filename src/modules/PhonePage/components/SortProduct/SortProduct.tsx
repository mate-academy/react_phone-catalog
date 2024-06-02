import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styles from './SortProduct.module.scss';
import { useEffect, useMemo, useState } from 'react';
import usePageLocation from '../../../shared/hooks/usePageLocation';
import useFilterProducts from '../../../shared/hooks/useFilterProducts';
import classNames from 'classnames';

export const SortProduct: React.FC = () => {
  const [isOpenButtonSort, setIsOpenButtonSort] = useState(false);
  const [isOpenButtonPage, setIsOpenButtonPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { pageLocation } = usePageLocation();
  const { filterProduct } = useFilterProducts();
  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || '';
  const { search } = useLocation();
  const [sortName, setSortName] = useState('');
  const chooseSort = (value: string | null) => {
    switch (value) {
      case 'Newest':
        return 'age';

      case 'Alphabetically':
        return 'title';

      case 'Cheapest':
        return 'price';

      default:
        return '';
    }
  };

  const changNameSort = (value: string) => {
    switch (value) {
      case 'age':
        return 'Newest';

      case 'title':
        return 'Alphabetically';

      case 'price':
        return 'Cheapest';

      default:
        return '';
    }
  };

  useEffect(() => {
    setSortName(changNameSort(sort));
  }, [search, sort]);

  const handleFilterProduct = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const params = new URLSearchParams(searchParams);
    const sortByProduct = chooseSort(e.currentTarget.textContent);

    params.set('sort', sortByProduct);
    setSearchParams(params);
    setIsOpenButtonSort(prev => !prev);
  };

  const getPerpage = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const params = new URLSearchParams(searchParams);

    if (e.currentTarget.innerText === 'All') {
      params.delete('perPage');
      params.delete('page');
    } else {
      params.set('perPage', e.currentTarget.innerText);
      params.set('page', '1');
    }

    setSearchParams(params);
    setIsOpenButtonPage(false);
  };

  const findPagination = useMemo(() => {
    let pagination = 0;

    if (!search.includes('perPage')) {
      return;
    }

    search.split('&').forEach(item => {
      if (item.includes('perPage')) {
        pagination = +item.split('=')[1];
      }
    });

    return pagination;
  }, [search]);

  return (
    <div className={styles.phones__page}>
      <div className={styles.phones__page__location}>
        <Link className={styles.phones__page__home__img} to="/"></Link>
        <span className={styles.phones__page__arrow}></span>
        <span className={styles.phones__page__plase}>{pageLocation}</span>
      </div>
      <h1 className={styles.phones__page__title}>{`${pageLocation} page`}</h1>
      <div className={styles.phones__page__items}>
        {`${filterProduct.length} models`}
      </div>
      <div className={styles.phones__page__search}>
        <div
          className={styles.search__product}
          onBlur={e => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsOpenButtonSort(false);
            }
          }}
        >
          <span className={styles.search__product}>Sort by</span>
          <button
            className={styles.search__by}
            onClick={() => setIsOpenButtonSort(prev => !prev)}
          >
            {sortName ? sortName : 'Choose option'}

            {isOpenButtonSort ? (
              <i
                className={`${styles.search__arrow} ${styles.search__down}`}
              ></i>
            ) : (
              <i className={`${styles.search__arrow} ${styles.search__up}`}></i>
            )}
          </button>
          <ul
            className={styles.search__list}
            style={{ display: `${isOpenButtonSort ? 'block' : 'none'}` }}
          >
            <li
              className={classNames(styles.search__item, {
                [styles.search__is_active]: sortName === 'Newest',
              })}
              onClick={handleFilterProduct}
            >
              <button className={styles.search__name}>Newest</button>
            </li>
            <li
              className={classNames(styles.search__item, {
                [styles.search__is_active]: sortName === 'Alphabetically',
              })}
              onClick={handleFilterProduct}
            >
              <button className={styles.search__name}>Alphabetically</button>
            </li>
            <li
              className={classNames(styles.search__item, {
                [styles.search__is_active]: sortName === 'Cheapest',
              })}
              onClick={handleFilterProduct}
            >
              <button className={styles.search__name}>Cheapest</button>
            </li>
          </ul>
        </div>

        <div
          className={styles.search__product}
          onBlur={e => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsOpenButtonPage(false);
            }
          }}
        >
          <span className={styles.search__product}>Items on page</span>
          <button
            className={styles.search__by}
            onClick={() => setIsOpenButtonPage(prev => !prev)}
          >
            {perPage ? perPage : 'All'}
            {isOpenButtonPage ? (
              <i
                className={`${styles.search__arrow} ${styles.search__down}`}
              ></i>
            ) : (
              <i className={`${styles.search__arrow} ${styles.search__up}`}></i>
            )}
          </button>

          <ul
            className={styles.search__list}
            style={{ display: `${isOpenButtonPage ? 'block' : 'none'}` }}
          >
            <li
              className={classNames(styles.search__item, {
                [styles.search__is_active]: !findPagination,
              })}
              onClick={getPerpage}
            >
              <button className={styles.search__name}>All</button>
            </li>
            <li
              className={classNames(styles.search__item, {
                [styles.search__is_active]: findPagination === 4,
              })}
              onClick={getPerpage}
            >
              <button className={styles.search__name}>4</button>
            </li>
            <li
              className={classNames(styles.search__item, {
                [styles.search__is_active]: findPagination === 8,
              })}
              onClick={getPerpage}
            >
              <button className={styles.search__name}>8</button>
            </li>
            <li
              className={classNames(styles.search__item, {
                [styles.search__is_active]: findPagination === 16,
              })}
              onClick={getPerpage}
            >
              <button className={styles.search__name}>16</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
