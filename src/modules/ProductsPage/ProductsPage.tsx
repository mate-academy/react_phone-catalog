import React, { useEffect, useState } from 'react';
import styles from './ProductsPage.module.scss';
import { getProducts } from '../shared/services/productService';
import { Card } from '../../components/Card';
import { ItemsPerPage } from '../../types/ItemsPerPage';
import { ProductsSortType } from '../../types/ProductsSortType';
import { Card as CardType } from '../../types/Card';

type Props = {
  type: 'phones' | 'tablets' | 'accessories';
}

export const ProductsPage: React.FC<Props> = ({ type }) => {
  const [perPage, setPerPage] = useState<ItemsPerPage>('All');
  const [sortType, setSortType] = useState<ProductsSortType>('Newest');
  const [products, setProducts] = useState<CardType[]>([]);
  const [isPerPageDropdownOpen, setIsPerPageDropdownOpen] = useState<boolean>(false);
  const [isSortTypeDropdownOpen, setIsSortTypeDropdownOpen] = useState<boolean>(false);

  const sortTypes = ['Newest', 'Alphabetically', 'Chepest'];
  const perPageValues = ['All', 4, 8, 16];

  useEffect(() => {
    setProducts(getProducts().filter(product => product.category === type));
  }, [type]);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </h1>

      <span
        className={`${styles.counter} smallText`}
      >{products.length} models</span>

      <div className={styles.content}>
        <div className={styles.sorters}>
          <div className={`${styles.sortType} ${styles.sorter}`}>
            <span className='smallText'>Sort by</span>

            <div className={styles.dropdown}>
              <button
                onClick={() => setIsSortTypeDropdownOpen(prev => !prev)}
                className={styles.dropdownTrigger}
              >
                {sortType}
                <span className={styles.arrowContainer}>
                  <img
                    className={`${styles.arrow} ${!isSortTypeDropdownOpen ? styles.down : ''}`}
                    src="/img/icons/arrow-disabled.svg"
                    alt={`Arrow ${isSortTypeDropdownOpen ? 'up' : 'down'}`}
                  />
                </span>
              </button>

              {isSortTypeDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {sortTypes.map(type => (
                    <a
                      key={type}
                      onClick={() => {
                        setSortType(type as ProductsSortType);
                        setIsSortTypeDropdownOpen(false);
                      }}
                      className={`${styles.dropdownItem} bodyText`}
                    >{type}</a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={`${styles.perPageItems} ${styles.sorter}`}>
            <span className='smallText'>Items on page</span>
            <div className={styles.dropdown}>
              <button
                onClick={() => setIsPerPageDropdownOpen(prev => !prev)}
                className={styles.dropdownTrigger}
              >
                {perPage}
                <span className={styles.arrowContainer}>
                  <img
                    className={`${styles.arrow} ${!isPerPageDropdownOpen ? styles.down : ''}`}
                    src="/img/icons/arrow-disabled.svg"
                    alt={`Arrow ${isPerPageDropdownOpen ? 'up' : 'down'}`}
                  />
                </span>
              </button>

              {isPerPageDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {perPageValues.map(value => (
                    <a
                      key={value}
                      onClick={() => {
                        setPerPage(value as ItemsPerPage);
                        setIsPerPageDropdownOpen(false);
                      }}
                      className={`${styles.dropdownItem} bodyText`}
                    >{value}</a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.products}>
          {products.map(product => (
            <Card key={product.id} card={product} />
          ))}
        </div>
      </div>
    </main>
  );
};
