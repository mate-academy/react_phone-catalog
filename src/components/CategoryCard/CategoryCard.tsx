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
    <Link className={styles.wrapper} to={href}>
      <div className={styles.card}>
        <img className={styles.picture} src={image} alt={category} />

        <p className={styles.title}>{category}</p>
        <p className={styles.subtitle}>{total} models</p>
      </div>
    </Link>
  );
};
