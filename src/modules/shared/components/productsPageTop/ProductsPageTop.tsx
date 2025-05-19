import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductsPageTop.module.scss';
import { Dropdown } from '../dropdown';
import { SortOptions } from '../../../../types/SortOptions';

type Props = {
  title: string;
  page: string;
  countModels: number;
};

const sortOptions: SortOptions[] = ['newest', 'alphabetically', 'cheapest'];
const itemOnPageOptions = ['all', '4', '8', '16'];

export const ProductsPageTop: React.FC<Props> = ({
  title,
  page,
  countModels,
}) => {
  return (
    <section className={styles.productPageTop}>
      <div className={styles.links}>
        <Link to={'/'} className={styles.link}>
          <img src="img/icons/home.svg" alt="home" className="icons" />
        </Link>

        <img
          src="img/icons/arrow-right.svg"
          alt="arrow right"
          className="icons"
        />

        <span className={styles.currentPage}>{page}</span>
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.counter}>{`${countModels} models`}</span>
      </div>

      <div className={styles.dropdowns}>
        <div className={styles.sortDropdown}>
          <Dropdown
            title="Sort by"
            options={sortOptions}
            propertyName={'sortBy'}
          />
        </div>

        <div className={styles.itemOnPageDropdown}>
          <Dropdown
            title="Items on page"
            options={itemOnPageOptions}
            propertyName={'perPage'}
            ignoreValue={'all'}
          />
        </div>
      </div>
    </section>
  );
};
