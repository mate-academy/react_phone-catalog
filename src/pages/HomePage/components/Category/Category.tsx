import React, { useContext } from 'react';
import products from '../../../../../public/api/products.json';
import { Link } from 'react-router-dom';
import styles from './Category.module.scss';
import { ThemeContext } from '../../../../utils/themeContext';
import { Theme } from '../../../../../public/api/types/theme';

export const Category = () => {
  const phones = products.filter(product => product.category === 'phones');
  const tablets = products.filter(product => product.category === 'tablets');
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={[
        styles.categories,
        theme === Theme.LIGHT ? styles['categories--light'] : '',
      ].join(' ')}
      id="categories"
    >
      <p className={styles.section__title}>Shop by category</p>
      <div className={styles.categories__wrapper}>
        <Link to="/phones" className={styles.category}>
          <div className={styles.category__media}>
            <img
              src="img/phones_sections.png"
              alt="Mobile phones"
              className={styles.category__photo}
              loading="lazy"
            />
          </div>
          <h4 className={styles.category__title}>Mobile phones</h4>
          <p className={styles.category__pieces}>{phones.length} models</p>
        </Link>

        <Link to="/tablets" className={styles.category}>
          <div className={styles.category__media}>
            <img
              src="img/tablets_sections.png"
              alt="Tablets"
              className={styles.category__photo}
              loading="lazy"
            />
          </div>
          <h4 className={styles.category__title}>Tablets</h4>
          <p className={styles.category__pieces}>{tablets.length} models</p>
        </Link>

        <Link to="/accessories" className={styles.category}>
          <div className={styles.category__media}>
            <img
              src="img/accessories_sections.png"
              alt="Accessories"
              className={styles.category__photo}
              loading="lazy"
            />
          </div>
          <h4 className={styles.category__title}>Accessories</h4>
          <p className={styles.category__pieces}>{accessories.length} models</p>
        </Link>
      </div>
    </section>
  );
};
