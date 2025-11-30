import { Link } from 'react-router-dom';
import { CategoryInterface } from '../../interfaces/Category';
import styles from './Category.module.scss';

const categories: CategoryInterface[] = [
  {
    id: 1,
    image: './img/category/mobile.png',
    title: 'Mobile phones',
    path: 'phones',
    content: '95',
  },
  {
    id: 2,
    image: './img/category/tablets.png',
    title: 'Tablets',
    path: 'tablets',
    content: '24',
  },
  {
    id: 3,
    image: './img/category/accessories.png',
    title: 'Accessories',
    path: 'accessories',
    content: '100',
  },
];

export const Category: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Shop by category</h1>

      <div className={styles.categories}>
        {categories.map(category => (
          <article key={category.id} className={styles.category}>
            <Link
              to={`/${category.path}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`${styles.category__link} ${styles.category__linkWide}`}
            >
              <img
                className={styles.category__photo}
                src={category.image}
                alt={category.title}
              />
            </Link>
            <h3 className={styles.category__title}>{category.title}</h3>
            <p className={styles.category__text}>{category.content} models</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Category;
