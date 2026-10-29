import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types';
import styles from './Categories.module.scss';

type Props = {
  products: Product[];
};

const CATEGORIES = [
  { category: 'phones', title: 'Mobile phones', color: '#6D6474' },
  { category: 'tablets', title: 'Tablets', color: '#8D8D92' },
  { category: 'accessories', title: 'Accessories', color: '#D53C51' },
];

export const Categories = ({ products }: Props) => {
  return (
    <div className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.products}>
        {CATEGORIES.map(({ category, title, color }) => {
          return (
            <Link key={category} to={`/${category}`}>
              <div
                className={styles.imageWrapper}
                style={{ backgroundColor: color }}
              >
                <img
                  src={`img/category-${category}.webp`}
                  alt={category}
                  className={styles.mainImg}
                />
              </div>
              <h4 className={styles.name}>{title}</h4>
              <span className={styles.text}>
                {
                  products.filter(product => product.category === category)
                    .length
                }{' '}
                models
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
