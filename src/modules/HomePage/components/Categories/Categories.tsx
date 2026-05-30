import classNames from 'classnames';
import styles from './Categories.module.scss';
import { Link } from 'react-router-dom';
import phones from '../../../../../public/api/phones.json';
import tablets from '../../../../../public/api/tablets.json';
import accessories from '../../../../../public/api/accessories.json';

const CATEGORIES = [
  {
    id: 'phones',
    image: '/img/category-phones.webp',
    title: 'Mobile phones',
    modelsAmount: phones.length,
  },
  {
    id: 'tablets',
    image: '/img/category-tablets.webp',
    title: 'Tablets',
    modelsAmount: tablets.length,
  },
  {
    id: 'accessories',
    image: '/img/category-accessories.webp',
    title: 'Accessories',
    modelsAmount: accessories.length,
  },
];

export const Categories = () => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>

      <div className={styles.categories__container}>
        {CATEGORIES.map(category => (
          <div className={styles.categories__category} key={category.id}>
            <Link
              to={`./${category.id}`}
              className={classNames(
                styles.categories__categoryLink,
                styles[`categories__categoryLink--${category.id}`],
              )}
            >
              <img
                src={category.image}
                alt="category image"
                className={styles.categories__categoryImage}
              />
            </Link>

            <div className={styles.categories__categoryDescription}>
              <Link
                to={`./${category.id}`}
                className={styles.categories__categoryDescriptionTitle}
              >
                {category.title}
              </Link>
              <Link
                to={`./${category.id}`}
                className={styles.categories__categoryDescriptionText}
              >
                {`${category.modelsAmount} models`}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
