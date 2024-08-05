import { Link } from 'react-router-dom';

import styles from './CategoryCard.module.scss';

type Props = {
  image: string;
  category: string;
  total: number;
  href: string;
};

export const CategoryCard: React.FC<Props> = ({
  image,
  category,
  total,
  href,
}) => {
  return (
    <Link className={styles.Wrapper} to={href}>
      <div className={styles.CategoryCard}>
        <img className={styles.Picture} src={image} alt={category} />

        <p className={styles.Title}>{category}</p>
        <p className={styles.Subtitle}>{total} models</p>
      </div>
    </Link>
  );
};
