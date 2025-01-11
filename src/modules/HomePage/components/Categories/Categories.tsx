import React from 'react';
import styles from './Categories.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Categories: React.FC = () => {
  const categories = [
    {
      id: 'phones',
      title: 'Mobile phones',
      subtitle: '95 models',
      imageSrc: 'src/Images/category-phones2.png',
      link: '/catalog/phones',
    },
    {
      id: 'tablets',
      title: 'Tablets',
      subtitle: '24 models',
      imageSrc: 'src/Images/category-tablets2.png',
      link: '/catalog/tablets',
    },
    {
      id: 'accessories',
      title: 'Accessories',
      subtitle: '100 models',
      imageSrc: 'src/Images/category-accessories2.png',
      link: '/catalog/accessories',
    },
  ];

  return (
    <section className={classNames(styles.categories, styles.container)}>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <div className={styles.categories__grid}>
        {categories.map(({ id, title, subtitle, imageSrc, link }) => (
          <div className={styles.category} key={id}>
            <NavLink
              to={link}
              className={classNames(
                styles['image-link'],
                styles[`image-link--${id}`],
              )}
            >
              <div className={styles['image-wrapper']}>
                <img
                  src={imageSrc}
                  alt={title}
                  className={styles.category__img}
                />
              </div>
              <div className={styles.category__text}>
                <p className={styles.category__title}>{title}</p>
                <p className={styles.category__subtitle}>{subtitle}</p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  );
};
