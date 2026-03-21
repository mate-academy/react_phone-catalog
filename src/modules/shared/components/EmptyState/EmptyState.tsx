import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EmptyState.module.scss';

interface Props {
  title: string;
  text?: string;
  imgUrl: string;
  showCategories?: boolean;
}

export const EmptyState: React.FC<Props> = ({
  title,
  text,
  imgUrl,
  showCategories = false,
}) => {
  return (
    <div className={styles.empty}>
      <img src={imgUrl} alt={title} className={styles.empty__image} />
      <h2 className={styles.empty__title}>{title}</h2>
      {text && <p className={styles.empty__text}>{text}</p>}

      {showCategories ? (
        <div className={styles.categories}>
          <Link to="/phones" className={styles.categoryBtn}>
            Phones
          </Link>
          <Link to="/tablets" className={styles.categoryBtn}>
            Tablets
          </Link>
          <Link to="/accessories" className={styles.categoryBtn}>
            Accessories
          </Link>
        </div>
      ) : (
        <Link to="/" className={styles.empty__button}>
          Go to Home
        </Link>
      )}
    </div>
  );
};
