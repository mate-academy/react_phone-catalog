import { Link } from 'react-router-dom';
import styles from './ProductImage.module.scss';
import { getPublicPath } from '../../../../modules/shared/utils/pathHelper';

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
        <img src={getPublicPath(image)} alt={name} className={styles.image} />
      </div>
    </Link>
  );
};
