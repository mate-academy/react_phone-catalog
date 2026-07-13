import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';
import { Product } from '../../../shared/types/Product';
import { getProducts } from '../../../shared/utils/api';

export const Categories: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const counts = useMemo(() => {
    return {
      phones: products.filter(p => p.category === 'phones').length,
      tablets: products.filter(p => p.category === 'tablets').length,
      accessories: products.filter(p => p.category === 'accessories').length,
    };
  }, [products]);

  return (
    <div className={styles.categories__container_block}>
      <h2>Shop by category</h2>
      <div className={styles.categories__container}>
        <Link to="/phones" className={styles.categories__card}>
          <div className={styles.categories__card_phones}>
            <img
              src="/img/category-phones.png"
              alt="Phones"
              className={styles.categories__image}
            />
          </div>
          <h3>Mobile phones</h3>
          <p>{counts.phones} models</p>
        </Link>

        <Link to="/tablets" className={styles.categories__card}>
          <div className={styles.categories__card_tablets}>
            <img
              src="/img/category-tablets.png"
              alt="Tablets"
              className={styles.categories__image}
            />
          </div>
          <h3>Tablets</h3>
          <p>{counts.tablets} models</p>
        </Link>

        <Link to="/accessories" className={styles.categories__card}>
          <div className={styles.categories__card_accessories}>
            <img
              src="/img/category-accessories.png"
              alt="Accessories"
              className={styles.categories__image}
            />
          </div>
          <h3>Accessories</h3>
          <p>{counts.accessories} models</p>
        </Link>
      </div>
    </div>
  );
};
