import React from 'react';
import styles from './Categories.module.scss';
import phones from '../../../public/api/phones.json';
import { Link } from 'react-router-dom';

export const Categories: React.FC = () => {
  const CategoriesCollection = [
    {
      src: '../../img/categories/phones.png',
      alt: 'phone image',
      title: 'Mobile phones',
      count: phones.length.toString(),
      href: '/phones',
    },
    {
      src: '../../img/categories/tablets.png',
      alt: 'tablet image',
      title: 'Tablets',
      count: '24',
      href: '/',
    },
    {
      src: '../../img/categories/accessories.png',
      alt: 'phone image',
      title: 'Accessories',
      count: '100',
      href: '/',
    },
  ];

  return (
    <>
      <div className={`${styles.category_main_container}`}>
        <h2 className={`${styles.category_title}`}>Shop by category</h2>
        <div className={`${styles.all_categories}`}>
          {CategoriesCollection.map((category, id) => {
            return (
              <div className={`${styles.category_card}`} key={id}>
                <Link
                  to={category.href}
                  onClick={() => window.scrollTo({ top: 0 })}
                  className={`${styles.category_card_link}`}
                >
                  <img
                    src={category.src}
                    alt={category.alt}
                    className={`${styles.category_image}`}
                  />
                </Link>
                <div className={`${styles.category_info_container}`}>
                  <Link
                    to={category.href}
                    onClick={() => window.scrollTo({ top: 0 })}
                    className={`${styles.category_card_link}`}
                  >
                    <h4 className={`${styles.category_name}`}>
                      {category.title}
                    </h4>
                  </Link>
                  <p className={`${styles.category_items_count}`}>
                    {category.count} models
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
