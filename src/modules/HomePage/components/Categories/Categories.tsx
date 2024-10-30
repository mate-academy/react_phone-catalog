import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';
import { MainNavigation } from '../../../../utils/constants';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../../../servises/products';
import { Category } from '../../../../types';

export const Categories = () => {
  const initialCategories = [
    {
      title: 'Mobile phones',
      count: 0,
      category: 'phones',
      img: 'img/category-phones.png',
      path: MainNavigation.PHONES,
    },
    {
      title: 'Tablets',
      count: 0,
      category: 'tablets',
      img: 'img/category-tablets.png',
      path: MainNavigation.TABLETS,
    },
    {
      title: 'Accessories',
      count: 0,
      category: 'accessories',
      img: 'img/category-accessories.png',
      path: MainNavigation.ACCESSORIES,
    },
  ];
  const [categories, setCategories] = useState(initialCategories);

  useEffect(() => {
    getAllProducts.then(products => {
      const counts: Record<Category, number> = {
        phones: 0,
        tablets: 0,
        accessories: 0,
      };

      products.forEach(p => {
        counts[p.category] += 1;
      });

      setCategories(current =>
        current.map(category => ({
          ...category,
          count: counts[category.category as Category],
        })),
      );
    });
  }, []);

  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <ul className={styles.categories__list}>
        {categories.map(category => {
          const { path, img, count, title } = category;

          return (
            <li key={title} className={styles.categories__item}>
              <Link
                className={styles.categories__link}
                to={path}
                aria-label={title}
              >
                <img className={styles.categories__img} src={img} alt={title} />
                <h4 className={styles['categories__item-title']}>{title}</h4>
                <p className={styles.categories__text}>{count} models</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
