import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
  id: number;
  name: string;
  link: string;
  count: number;
  image: string;
  categoryId: 'phones' | 'tablets' | 'accessories';
}

export const CategoryCard: FC<CategoryCardProps> = ({
  name,
  link,
  count,
  image,
}) => {
  return (
    <Link to={link} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <p className={styles.count}>{count} models</p>
      </div>
    </Link>
  );
};
