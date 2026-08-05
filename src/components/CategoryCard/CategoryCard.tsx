import { Link } from 'react-router-dom';

import styles from './CategoryCard.module.scss';

type Props = {
  title: string;
  count: number;
  image: string;
  path: string;
  imageClassName?: string;
  imageWrapperClassName?: string;
};

export const CategoryCard = ({
  title,
  count,
  image,
  path,
  imageClassName = '',
  imageWrapperClassName = '',
}: Props) => {
  return (
    <article className={styles.card}>
      <Link
        to={path}
        className={`${styles.imageLink} ${imageWrapperClassName}`}
      >
        <img
          src={image}
          alt={title}
          className={`${styles.image} ${imageClassName}`}
        />
      </Link>

      <Link to={path} className={styles.title}>
        {title}
      </Link>

      <p className={styles.count}>
        {count} {count === 1 ? 'model' : 'models'}
      </p>
    </article>
  );
};
