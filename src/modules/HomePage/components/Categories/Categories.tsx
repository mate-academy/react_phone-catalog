import React from 'react';
import { Link } from 'react-router-dom';
import {
  CATEGORIES,
  CATEGORY_NAMES,
} from '../../../shared/constants/categories';
import styles from './Categories.module.scss';

const CATEGORY_IMAGES = {
  [CATEGORIES.PHONES]: 'img/category-phones.png',
  [CATEGORIES.TABLETS]: 'img/category-tablets.png',
  [CATEGORIES.ACCESSORIES]: 'img/category-accessories.png',
};

const CATEGORY_WEBP_IMAGES = {
  [CATEGORIES.PHONES]: 'img/category-phones.webp',
  [CATEGORIES.TABLETS]: 'img/category-tablets.webp',
  [CATEGORIES.ACCESSORIES]: 'img/category-accessories.webp',
};

export const Categories: React.FC = () => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>

      <div className={styles.categories__grid}>
        {Object.values(CATEGORIES).map(category => (
          <div key={category} className={styles.categories__item}>
            <Link to={`/${category}`} className={styles.categories__link}>
              <div className={styles.categories__imageContainer}>
                <picture>
                  <source
                    srcSet={CATEGORY_WEBP_IMAGES[category]}
                    type="image/webp"
                  />
                  <img
                    src={CATEGORY_IMAGES[category]}
                    alt={CATEGORY_NAMES[category]}
                    className={styles.categories__image}
                  />
                </picture>
              </div>

              <h3 className={styles.categories__name}>
                {CATEGORY_NAMES[category]}
              </h3>

              <p className={styles.categories__count}>
                {/* This would be dynamic in a real app */}
                {Math.floor(Math.random() * 100) + 50} models
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
