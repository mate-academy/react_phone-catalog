import React from 'react';
import styles from './Categories.module.scss';
import { Link } from 'react-router-dom';
import { AppContext } from '../../AppContext';

export const Categories: React.FC = () => {
  const { products } = React.useContext(AppContext);

  const phoneItemsCount = React.useMemo(
    () =>
      products
        ? products.filter(product => product.category === 'phones').length
        : 0,
    [products],
  );

  const tabletItemsCount = React.useMemo(
    () =>
      products
        ? products.filter(product => product.category === 'tablets').length
        : 0,
    [products],
  );

  const accessoriesItemsCount = React.useMemo(
    () =>
      products
        ? products.filter(product => product.category === 'accessories').length
        : 0,
    [products],
  );

  return (
    <section>
      <h2 className={styles.header}>Shop by category</h2>

      <div className={styles.container}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/phones" className={styles.link}>
              <div className={styles.wrapper}>
                <div className={`${styles.image} ${styles.phones}`} />
                <h4 className={styles.name}>Mobile phones</h4>
                <p className={styles.itemsCount}>{phoneItemsCount} models</p>
              </div>
            </Link>
          </li>

          <li className={styles.item}>
            <Link to="/tablets" className={styles.link}>
              <div className={styles.wrapper}>
                <div className={`${styles.image} ${styles.tablets}`} />
                <h4 className={styles.name}>Tablets</h4>
                <p className={styles.itemsCount}>{tabletItemsCount} models</p>
              </div>
            </Link>
          </li>

          <li className={styles.item}>
            <Link to="/accessories">
              <div className={styles.wrapper}>
                <div className={`${styles.image} ${styles.accessories}`} />
                <h4 className={styles.name}>Accessories</h4>
                <p className={styles.itemsCount}>
                  {accessoriesItemsCount} models
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Categories;
