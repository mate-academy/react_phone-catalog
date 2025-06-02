import { Link } from 'react-router-dom';
import styles from './CategoryItem.module.scss';

type Props = {
  header: string;
  image: string;
  productsCount: string;
};

export const CategoryItem = ({ header, image, productsCount }: Props) => {
  return (
    <div className={styles.card}>
      <Link to={'/phones'}>
        <img className={styles.card__image} src={image} alt="product image" />
      </Link>

      <Link to={'/phones'}>
        <h3 className={styles.card__header}>{header}</h3>
      </Link>
      <span className={styles.card__count}>{productsCount}</span>
    </div>
  );
};
