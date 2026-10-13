import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';

interface Props {
  title: string;
  count: number;
  image: string;
  link: string;
}

export const CategoryCard = ({ title, count, image, link }: Props) => {
  return (
    <Link to={link} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={`/${image}`} alt={title} className={styles.image} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.count}>{count} models</span>
      </div>
    </Link>
  );
};
