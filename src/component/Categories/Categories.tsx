import { useEffect, useMemo, useState } from 'react';
import style from './Categories.module.scss';
import { getAllProducts } from '../utils/sortingProducts';
import { Link } from 'react-router-dom';

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
    <section className={style.categories}>
      <h2 className={style.categories__title}>Shop by category</h2>
      <ul className={style.categories__list}>
        {categories.map(category => {
          const { title, path, count, img } = category;

          return (
            <li className={style.categories__item} key={title}>
              <Link to={path} className={style.categories__link}>
                <img
                  src={img}
                  className={style.categories__image}
                  alt={title}
                />
                <h4 className={style.categories__subtitle}>{title}</h4>
                <p className={style.categories__info}>{count} models</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
