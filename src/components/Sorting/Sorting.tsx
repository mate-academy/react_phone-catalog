import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import styles from './Sorting.module.scss';
import { UseHooks } from '../../AppHooks';
import { useEffect } from 'react';

export const Sorting = () => {
  const { page, items, sort, setSort, setItems, setPage } = UseHooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    setPage(1);
    setItems('all');
    setSort('age');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }

    if (items === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', items);
    }

    if (sort === 'age') {
      params.delete('sort');
    } else {
      params.set('sort', sort);
    }

    setSearchParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, items, sort]);

  return (
    <div className={styles.params}>
      <div className={styles.params__sort1}>
        <p className={classNames(styles.params__text, 'small-text')}>Sort by</p>
        <div
          className={classNames(
            styles.params__selectContainer,
            styles['params__selectContainer--active'],
          )}
        >
          <select
            className={classNames(styles.params__select)}
            name="sortBy"
            value={sort}
            onChange={e => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="age">Newest</option>
            <option value="title">Aplhabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>
      </div>
      <div className={styles.params__sort2}>
        <p className={classNames(styles.params__text, 'small-text')}>
          Items on page
        </p>
        <div className={styles.params__selectContainer}>
          <select
            className={classNames(styles.params__select)}
            name="itemsPerPage"
            value={items}
            onChange={e => {
              setItems(e.target.value);
              setPage(1);
            }}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
    </div>
  );
};
