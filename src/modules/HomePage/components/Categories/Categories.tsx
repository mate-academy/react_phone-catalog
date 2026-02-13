import React from 'react';
import { Link } from 'react-router-dom';
import {
  CATEGORIES,
  CATEGORY_NAMES,
} from '../../../shared/constants/categories';
import styles from './Categories.module.scss';

const CATEGORY_DETAILS = {
  [CATEGORIES.PHONES]: {
    name: CATEGORY_NAMES.phones,
    image: 'img/Phones1.png',
    count: '95 models',
  },
  [CATEGORIES.TABLETS]: {
    name: CATEGORY_NAMES.tablets,
    image: 'img/tablet1.png',
    count: '24 models',
  },
  [CATEGORIES.ACCESSORIES]: {
    name: CATEGORY_NAMES.accessories,
    image: 'img/accessories1.png',
    count: '100 models',
  },
};

export const Categories: React.FC = () => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>

      <div className={styles.categories__grid}>
        {Object.entries(CATEGORY_DETAILS).map(([key, details]) => (
          <Link key={key} to={`/${key}`} className={styles.categories__item}>
            <div className={styles.categories__imageContainer}>
              <img
                src={details.image}
                alt={details.name}
                className={styles.categories__image}
              />
            </div>

            <div className={styles.categories__textContainer}>
              <h3 className={styles.categories__name}>{details.name}</h3>
              <p className={styles.categories__count}>{details.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
