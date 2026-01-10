import { Link } from 'react-router-dom';
import styles from './CategoryTile.module.scss';

interface Props {
  title: string;
  to: string;
  image: string;
  description?: string;
}

export const CategoryTile: React.FC<Props> = ({
  title,
  to,
  image,
  description,
}) => (
  <Link to={to} className={styles.tile}>
    <div className={styles.preview}>
      <img src={image} alt={title} />
    </div>
    <div className={styles.meta}>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  </Link>
);
