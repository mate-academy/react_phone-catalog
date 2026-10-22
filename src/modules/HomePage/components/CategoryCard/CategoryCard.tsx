import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';

type Props = {
  title: string;
  image: string;
  link: string;
  models: number;
  variant?: 'default' | 'category';
};

export const CategoryCard: React.FC<Props> = ({
  title,
  image,
  link,
  models,
  variant = 'default',
}) => {
  const wrapperClass =
    variant === 'category'
      ? `${styles.imageWrapper} ${styles['imageWrapper--category']}`
      : styles.imageWrapper;

  const cardClass =
    variant === 'category'
      ? `${styles.card} ${styles['card--category']}`
      : styles.card;

  return (
    <Link to={link} className={cardClass}>
      <div className={wrapperClass}>
        <img src={image} alt={title} />
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.models}>{models} models</p>
      </div>
    </Link>
  );
};
