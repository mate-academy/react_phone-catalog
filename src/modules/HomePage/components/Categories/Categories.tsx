import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';
import { MainNavigation } from '../../../../utils/constants';

const categories = [
  {
    title: 'Mobile phones',
    count: 95,
    img: '/img/category-phones.png',
    path: MainNavigation.PHONES,
  },
  {
    title: 'Tablets',
    count: 24,
    img: '/img/category-tablets.png',
    path: MainNavigation.TABLETS,
  },
  {
    title: 'Accessories',
    count: 100,
    img: '/img/category-accessories.png',
    path: MainNavigation.ACCESSORIES,
  },
];

export const Categories = () => {
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
