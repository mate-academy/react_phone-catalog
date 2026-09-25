import { Link } from 'react-router-dom';
import { CategoryItemData } from '../../../../../../types/CategoryItemData';
import styles from './CategoryItem.module.scss';

type Props = {
  item: CategoryItemData;
};

export const CategoryItem = ({ item }: Props) => {
  return (
    <Link to={`/${item.category}`} className={styles.category}>
      <div className={styles.imgContainer}>
        <img
          className={styles.categoryImg}
          src={item.imgSrc}
          alt={item.category}
        />
      </div>
      <div className={styles.info}>
        <h4 className={styles.categoryTitle}>{item.title}</h4>
        <span className={styles.counter}>{item.count} models</span>
      </div>
    </Link>
  );
};
