import styles from './Categories.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getAllProducts } from '../../../../utils/sortingProducts';

export const Categories = () => {
  const allCategories = useMemo(
    () => [
      {
        title: 'Mobile phones',
        path: '/phones',
        count: 0,
        img: '/img/category-phones.png',
        category: 'phones',
      },
      {
        title: 'Tablets',
        path: '/tablets',
        count: 0,
        img: '/img/category-tablets.png',
        category: 'tablets',
      },
      {
        title: 'Accessories',
        path: '/accessories',
        count: 0,
        img: '/img/category-accessories.png',
        category: 'accessories',
      },
    ],
    [],
  );

  const [categories, setCategories] = useState(allCategories);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getAllProducts();
      const updatedCategories = allCategories.map(category => {
        const count = products.filter(
          product => product.category === category.category,
        ).length;

        return { ...category, count };
      });

      setCategories(updatedCategories);
    };

    fetchData();
  }, [allCategories]);

  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <ul className={styles.categories__list}>
        {categories.map(category => {
          const { title, path, count, img } = category;

          return (
            <li className={styles.categories__item} key={title}>
              <Link to={path} className={styles.categories__link}>
                <img
                  src={img}
                  className={styles.categories__image}
                  alt={title}
                />
                <h4 className={styles.categories__subtitle}>{title}</h4>
                <p className={styles.categories__info}>{count} models</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
