import { Link } from 'react-router-dom';
import { Category } from '../../types/catalog';
import { getCategoryLabel } from '../../utils/catalog';
import styles from './CategoryCard.module.scss';

interface Props {
  category: Category;
  image: string;
  count: number;
}

export const CategoryCard = ({ category, image, count }: Props) => (
  <Link to={`/${category}`} className={styles.card}>
    <span className={styles.media}>
      <img
        src={image}
        alt={getCategoryLabel(category)}
        className={styles.image}
      />
    </span>
    <span className={styles.title}>{getCategoryLabel(category)}</span>
    <span className={styles.meta}>{count} models</span>
  </Link>
);
