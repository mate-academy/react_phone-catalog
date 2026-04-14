import { Link } from 'react-router-dom';
import styles from './ProductImage.module.scss';

interface Props {
  name: string;
  category?: string;
  itemId?: string;
  image: string;
}

export const ProductImage: React.FC<Props> = ({ name, category, itemId, image }) => {
  return (
    <Link to={`/${category}/${itemId}`} className={styles.imageLink}>
      <div className={styles.imageWrapper}>
        <img src={`/${image}`} alt={name} className={styles.image} />
      </div>
    </Link>
  );
};
