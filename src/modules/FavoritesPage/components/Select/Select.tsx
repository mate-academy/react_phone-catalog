import React from 'react';
import styles from './Select.module.scss';
import classNames from 'classnames';

export const Select = () => {
  return (
    <div className={styles.selectSection}>
      <div className={classNames(styles.select, styles['select--bigger'])}>
        <label className={styles.select__label} htmlFor="sortBy">
          Sort by
        </label>
        <select className={styles.select__item} id="sortBy">
          <option value="newest">Newest</option>
          <option value="alphabetically">Alphabetically</option>
          <option value="cheapest">Cheapest</option>
        </select>
      </div>

      <div className={classNames(styles.select, styles['select--smaller'])}>
        <label className={styles.select__label} htmlFor="sortByValue">
          Items on page
        </label>
        <select id="sortByValue" className={styles.select__item}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="all">all</option>
        </select>
      </div>
    </div>
  );
};
