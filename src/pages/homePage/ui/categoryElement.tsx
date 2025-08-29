import { Link } from 'react-router-dom';
import { HomePageCategory } from '../model';
import styles from '../styles/category.module.scss';

type Props = {
  category: HomePageCategory;
  amount: string;
};

export const CategoryElement = ({ category, amount }: Props) => (
  <div className={styles.category}>
    <Link
      to={`/${category.link}`}
      key={category.id}
      aria-label={`Explore our ${category.name}`}
      className={styles.category__link}
    >
      <img
        className={styles.category__image}
        src={`/src/shared/img/${category.src}`}
        alt={category.name}
      />
    </Link>
    <h3 className={styles.category__name}>{category.name}</h3>
    <span className={styles.category__amount}>{amount}</span>
  </div>
);
