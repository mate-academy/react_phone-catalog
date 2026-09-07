import React from 'react';
import styles from './PageHeader.module.scss';
import { Select } from '../../shared/Select';
import { SortBy } from '../../../types/SortBy';
import { SortPages } from '../../../types/SortPages';

type Props = {
  title: string;
  quantity: number;
};

const optionsSort = [
  { id: 1, option: SortBy.newest },
  { id: 2, option: SortBy.alphabetically },
  { id: 3, option: SortBy.cheapest },
];

const optionsItems = [
  { id: 1, option: SortPages.all },
  { id: 2, option: SortPages.pages4 },
  { id: 3, option: SortPages.pages8 },
  { id: 4, option: SortPages.pages16 },
];

export const PageHeader: React.FC<Props> = ({ title, quantity }) => {
  return (
    <>
      <div className={`page__page-header ${styles['page-header']}`}>
        <div className={styles['page-header__container']}>
          <h2 className={`${styles['page-header__title']} main-title`}>
            {title}
          </h2>
          <h2 className={styles['page-header__quantity']}>{quantity} models</h2>

          <div className={styles['page-header__selects']}>
            <div className={styles['page-header__wrapper']}>
              <p className={styles['page-header__sort-type']}>Sort by</p>
              <Select selectType="sort" options={optionsSort} />
            </div>

            <div
              className={`${styles['page-header__wrapper']} ${styles['page-header__wrapper--short']}`}
            >
              <p className={styles['page-header__sort-type']}>Items on page</p>
              <Select selectType="perPage" options={optionsItems} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
