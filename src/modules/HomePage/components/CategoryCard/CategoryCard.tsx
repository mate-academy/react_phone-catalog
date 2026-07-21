import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.scss';
import classNames from 'classnames';

type Props = {
  title: string;
  image: string;
  modelsCount: number;
  to: string;
};

export const CategoryCard: FC<Props> = ({ title, image, modelsCount, to }) => {
  return (
    <div className={styles.card}>
      <Link to={to} className={styles.card__link}>
        <div
          className={classNames(styles.card__imageBox, {
            [styles.card__imageBoxPhones]: to === '/phones',
            [styles.card__imageBoxTablets]: to === '/tablets',
            [styles.card__imageBoxAccessories]: to === '/accessories',
          })}
        >
          <img src={image} alt={title} className={styles.card__image} />
        </div>
        <h4 className={styles.card__title}>{title}</h4>
        <p className={styles.card__count}>{modelsCount} models</p>
      </Link>
    </div>
  );
};
