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
  avif: string;
  webp: string;
  alt: string;
  totalKey: keyof Props;
  link: string;
};

const categories: CategoryItem[] = [
  {
    title: 'Mobile phones',
    img: 'img/category/phones-category.png',
    avif: 'img/category/phones-category.avif',
    webp: 'img/category/phones-category.webp',
    alt: 'Phones',
    totalKey: 'phonesTotal',
    link: '/phones',
  },
  {
    title: 'Tablets',
    img: 'img/category/tablets-category.png',
    avif: 'img/category/tablets-category.avif',
    webp: 'img/category/tablets-category.webp',
    alt: 'Tablets',
    totalKey: 'tabletsTotal',
    link: '/tablets',
  },
  {
    title: 'Accessories',
    img: 'img/category/accessories-category.png',
    avif: 'img/category/accessories-category.avif',
    webp: 'img/category/accessories-category.webp',
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
          {categories.map(({ title, img, avif, webp, alt, totalKey, link }) => (
            <NavLink to={link} key={title} className={styles.category__item}>
              <div className={styles.category__imgWrapper}>
                <picture>
                  <source srcSet={avif} type="image/avif" />
                  <source srcSet={webp} type="image/webp" />
                  <img className={styles.category__img} src={img} alt={alt} />
                </picture>
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
