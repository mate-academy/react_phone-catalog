import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';
import products from '../../../../../public/api/products.json';

export const Categories: React.FC = () => {
  const phonesNumber = products.filter(p => p.category === 'phones').length;
  const tabletsNumber = products.filter(
    p => p.category === 'accessories',
  ).length;
  const accessoriesNumber = products.filter(
    p => p.category === 'tablets',
  ).length;
  const categories = [
    {
      title: 'Mobile Phones',
      img: 'img/category-phones.webp',
      link: '/phones',
      items: phonesNumber,
    },
    {
      title: 'Tablets',
      img: 'img/category-tablets.png',
      link: '/tablets',
      items: tabletsNumber,
    },
    {
      title: 'Accessories',
      img: 'img/category-accessories.png',
      link: '/accessories',
      items: accessoriesNumber,
    },
  ];

  return (
    <>
      <h2 style={{ marginBottom: '24px' }}>Shop by category</h2>
      <div className={styles.categories}>
        {categories.map((category, i) => (
          <div
            className={`${styles.categories__item} ${styles[`${category.title}`]}`}
            key={i}
          >
            <Link
              to={category.link}
              className={styles['categories__item--link']}
            >
              <img
                src={category.img}
                className={styles['categories__item--img']}
              />
            </Link>
            <h4>{category.title}</h4>
            <p
              className="body--text"
              style={{ color: '#89939A' }}
            >{`${category.items} models`}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
