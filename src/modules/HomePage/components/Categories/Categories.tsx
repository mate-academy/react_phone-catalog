import { withBase } from '../../../../utils/withBase';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './Categories.module.scss';

const CATEGORIES = [
  { id: 'phones', title: 'Phones', image: '/img/category-phones.webp' },
  { id: 'tablets', title: 'Tablets', image: '/img/category-tablets.webp' },
  {
    id: 'accessories',
    title: 'Accessories',
    image: '/img/category-accessories.webp',
  },
] as const;

export const Categories = () => (
  <section className={styles.categories}>
    <h2 className={styles.title}>Shop by category</h2>

    <div className={styles.grid}>
      {CATEGORIES.map(category => (
        <Link
          to={`/${category.id}`}
          className={styles.category}
          key={category.id}
        >
          <div className={cn(styles.imageWrapper, styles[category.id])}>
            <img
              src={withBase(category.image)}
              alt={category.title}
              className={styles.image}
            />
          </div>

          <h3 className={styles.name}>{category.title}</h3>
        </Link>
      ))}
    </div>
  </section>
);
