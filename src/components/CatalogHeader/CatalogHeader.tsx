import React from 'react';
import styles from './CatalogHeader.module.scss';
import classNames from 'classnames';
import { Dropdown } from '../Dropdown';
import { itemsOnPage, sortBy } from '../../helpers/constArrs';
import { ProductInfo } from '../../types/ProductInfo';

type Props = {
  products: ProductInfo[];
  category?: string;
};

export const CatalogHeader: React.FC<Props> = ({ products, category }) => {
  const isFavourites = category === 'Favourites';

  return (
    <>
      <div className={styles.catalogTop}>
        <h1>{category}</h1>
        <p className={styles.textTop}>{`${products.length}`} models</p>
      </div>

      {!isFavourites && (
        <div className={styles.catalogFilterWrap}>
          <div className={styles.catalogFilter}>
            <span className={styles.filterText}>Sort by</span>

            <Dropdown items={sortBy} params="sortBy" />
          </div>

          <div
            className={classNames(
              styles.catalogFilter,
              styles.catalogFilterLeft,
            )}
          >
            <span className={styles.filterText}>Items on page</span>

            <Dropdown items={itemsOnPage} params="onPage" />
          </div>
        </div>
      )}
    </>
  );
};
