import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Category.module.scss';

type Props = {
  phonesTotal: number;
  tabletsTotal: number;
  accessoriesTotal: number;
};

type CategoryItem = {
  title: string;
  img: string;
  alt: string;
  totalKey: keyof Props;
  link: string;
};

const categories: CategoryItem[] = [
  {
    title: 'Mobile phones',
    img: 'img/category/phones-category.png',
    alt: 'Phones',
    totalKey: 'phonesTotal',
    link: '/phones',
  },
  {
    title: 'Tablets',
    img: 'img/category/tablets-category.png',
    alt: 'Tablets',
    totalKey: 'tabletsTotal',
    link: '/tablets',
  },
  {
    title: 'Accessories',
    img: 'img/category/accessories-category.png',
    alt: 'Accessories',
    totalKey: 'accessoriesTotal',
    link: '/accessories',
  },
];

export const Category: React.FC<Props> = ({
  phonesTotal,
  tabletsTotal,
  accessoriesTotal,
}) => {
  const totals = {
    phonesTotal,
    tabletsTotal,
    accessoriesTotal,
  };

  return (
    <section className={styles.category}>
      <div className={styles.container}>
        <h2 className={styles.category__title}>Shop by category</h2>

        <div className={styles.category__content}>
          {categories.map(({ title, img, alt, totalKey, link }) => (
            <NavLink to={link} key={title} className={styles.category__item}>
              <div className={styles.category__imgWrapper}>
                <img className={styles.category__img} src={img} alt={alt} />
              </div>
              <div className={styles.category__info}>
                <h3 className={styles.category__subtitle}>{title}</h3>
                <span className={styles.category__text}>
                  {totals[totalKey]} models
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};
