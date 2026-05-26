import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryItem.module.scss';

type Props = {
  header: string;
  image: string;
  productsCount: string;
  linkTo: string;
};

export const CategoryItem: FC<Props> = ({
  header,
  image,
  productsCount,
  linkTo,
}) => {
  return (
    <article className={styles.item}>
      <Link className={styles.item__link} to={linkTo}>
        <img
          className={styles.item__image}
          src={image}
          alt={`${header} category image`}
        />
      </Link>

      <Link className={styles.item__link} to={linkTo}>
        <h4 className={styles.item__header}>{header}</h4>
      </Link>

      <span className={styles.item__count}>{productsCount} models</span>
    </article>
  );
};
