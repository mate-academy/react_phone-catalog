import {
  getAccessories,
  getPhones,
  getTablets,
} from '../../../../api/getProduct';
import { useEffect, useState } from 'react';

import Heading from '../../../../UI/Heading/Heading';
import { Link } from 'react-router-dom';
import Product from '../../../../types/Product';
import { ROUTES } from '../../../../constants/ROUTES';
import styles from './Categories.module.css';

export const Categories = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);

  useEffect(() => {
    getPhones().then(setPhones);
  }, []);
  useEffect(() => {
    getTablets().then(setTablets);
  }, []);
  useEffect(() => {
    getAccessories().then(setAccessories);
  }, []);

  return (
    <div className="container">
      <Heading className={styles.categories} as="h2">
        Shop by category
      </Heading>
      <div className={styles.shopCategories}>
        <article className={styles.shopCategory}>
          <Link to={ROUTES.PHONES} className={styles.categoryLink}>
            <div
              className={`${styles.categoryBackground} ${styles.phonesBackgroundColor}`}
            >
              <img
                src={`img/category-phones.png`}
                alt={`Category mobile phones`}
                className={`${styles.categoryImage}`}
              />
            </div>
          </Link>
          <Heading as="h3" className={styles.categoryTitle}>
            Mobile phones
          </Heading>
          <p className={styles.categoryModels}>{`${phones.length} models`}</p>
        </article>

        <article className={styles.shopCategory}>
          <Link to={ROUTES.TABLETS} className={styles.categoryLink}>
            <div
              className={`${styles.categoryBackground}  ${styles.tabletsBackgroundColor}`}
            >
              <img
                src={`img/category-tablets.png`}
                alt={`Category tablets`}
                className={`${styles.categoryImage}`}
              />
            </div>
          </Link>
          <Heading as="h3" className={styles.categoryTitle}>
            Tablets
          </Heading>
          <p className={styles.categoryModels}>{`${tablets.length} models`}</p>
        </article>

        <article className={styles.shopCategory}>
          <Link to={ROUTES.ACCESSORIES} className={styles.categoryLink}>
            <div
              className={`${styles.categoryBackground} ${styles.accessoriesBackgroundColor}`}
            >
              <img
                src={'img/category-accessories.png'}
                alt={'Category accessories'}
                className={`${styles.categoryImage}`}
              />
            </div>
          </Link>
          <Heading as="h3" className={styles.categoryTitle}>
            Accessories
          </Heading>
          <p
            className={styles.categoryModels}
          >{`${accessories.length} models`}</p>
        </article>
      </div>
    </div>
  );
};
