import { Link } from 'react-router-dom';
import { CategoryConfig } from '../../features/types/category';
import styles from './CategoryCard.module.scss';
import classNames from 'classnames';

type Props = {
  category: CategoryConfig;
  count: number;
};

export const CategoryCard = ({ category, count }: Props) => {
  const { key, title, link, image } = category;

  return (
    <Link to={link} className={classNames(styles.categoryCard, styles[key])}>
      <div className={styles.categoryCard__square}>
        <img className={styles.categoryCard__image} src={image} alt={title} />
      </div>
      <div className={styles.categoryCard__textBlock}>
        <h5 className={styles.categoryCard__title}>{title}</h5>
        <p className={styles.categoryCard__count}>{count} models</p>
      </div>
    </Link>
  );
};
