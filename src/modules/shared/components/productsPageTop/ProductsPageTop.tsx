import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductsPageTop.module.scss';
import { Dropdown } from '../dropdown';
import { SortOptions } from '../../../../types/SortOptions';
import { ArrowRightSvg } from '../../svg/ArrowRightSvg';
import { HomeSvg } from '../../svg/HomeSvg';

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
          <HomeSvg color="var(--home-svg-color)" />
        </Link>

        <ArrowRightSvg color="var(--disable-arrow-svg)" />

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
