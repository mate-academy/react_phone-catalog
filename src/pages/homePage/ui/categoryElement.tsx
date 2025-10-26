import { Link } from 'react-router-dom';
import { HomePageCategory } from '../model';
import styles from '../styles/category.module.scss';
import { LoadStatus } from '@shared/api';

type Props = {
  category: HomePageCategory;
  amount: LoadStatus | number;
};

export const CategoryElement = ({ category, amount }: Props) => (
  <div className={styles.category}>
    <Link
      to={`/${category.link}`}
      key={category.id}
      aria-label={`Explore our ${category.name}`}
      className={styles.category__link}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <img
        className={styles.category__image}
        src={`api/${category.src}`}
        alt={category.name}
        loading="lazy"
      />
    </Link>
    <h3 className={styles.category__name}>{category.name}</h3>
    <span className={styles.category__amount}>
      {typeof amount === 'string' ? 'Loading...' : `${amount} models`}
    </span>
  </div>
);
