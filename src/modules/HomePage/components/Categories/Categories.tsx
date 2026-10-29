import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Categories.module.scss';
import { useEffect, useState } from 'react';
import { getProductsCounts } from '../../../../services/productService';

const cx = classNames.bind(styles);

export const Categories = () => {
  const [counts, setCounts] = useState({
    phonesCount: 0,
    tabletsCount: 0,
    accessoriesCount: 0,
  });

  useEffect(() => {
    getProductsCounts().then(setCounts);
  }, []);

  const categories = [
    {
      name: 'Mobile phones',
      image: '/img/category-phones-baner.png',
      count: counts.phonesCount,
      link: '/phones',
    },
    {
      name: 'Tablets',
      image: '/img/category-tablets-baner.png',
      count: counts.tabletsCount,
      link: '/tablets',
    },
    {
      name: 'Accessories',
      image: '/img/category-accessories-baner.png',
      count: counts.accessoriesCount,
      link: '/accessories',
    },
  ];

  return (
    <section className={cx('categories')}>
      <h2 className={cx('categories__title')}>Shop by category</h2>

      <div className={cx('categories__items')}>
        {categories.map(category => (
          <Link
            key={category.link}
            to={category.link}
            className={cx('categories__item')}
          >
            <img
              className={cx('categories__image')}
              src={category.image}
              alt=""
            />

            <h3 className={cx('categories__name')}>{category.name}</h3>
            <p className={cx('categories__count')}>{category.count} models</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
