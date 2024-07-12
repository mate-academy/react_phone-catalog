import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';

const categories = [
  {
    name: 'Mobile phones',
    cover: 'img/iphone_category.png',
    number: 95,
    path: 'phones',
    color: 1,
  },
  {
    name: 'Tablets',
    cover: 'img/tablet_category.png',
    number: 43,
    path: 'tablets',
    color: 2,
  },
  {
    name: 'Accessories',
    cover: 'img/case_category.png',
    number: 17,
    path: 'accessories',
    color: 3,
  },
];

export const Categories = () => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>

      <div className={styles.categories__categories_wrapper}>
        {categories.map(category => (
          <div className={styles.categories__category} key={category.number}>
            <Link to={`/${category.path}`} className={styles.categories__link}>
              <div
                className={`${styles.categories__category_photo} ${styles[`categories__category_photo_${category.color}`]}`}
              >
                <img
                  className={styles.categories__category_img}
                  src={category.cover}
                  alt=""
                />
              </div>
            </Link>

            <div className={styles.categories__category_info}>
              <Link
                to={`/${category.path}`}
                className={styles.categories__link}
              >
                <h4 className={styles.categories__category_title}>
                  {category.name}
                </h4>
              </Link>
              <p className={styles.categories__category_description}>
                {category.number} models
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
