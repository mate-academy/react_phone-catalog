import React from 'react';
import styles from './EmptyState.module.scss';
import { Link } from 'react-router-dom';
import { RoutesLink } from '../../types/routes';

interface EmptyStateProps {
  image: string;
  title: string;
  description: string;
  buttonLink?: string | (() => void);
  buttonText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  image,
  title,
  description,
  buttonLink = RoutesLink.HomePage,
  buttonText = 'Go Home',
}) => {
  const isFunction = typeof buttonLink === 'function';

  return (
    <div className={styles.emptyState}>
      <div className={styles.imgContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>

      <h2 className={styles.title}>{title}</h2>

      <p className={styles.description}>{description}</p>

      {isFunction ? (
        <button onClick={buttonLink} className={styles.homeLink}>
          {buttonText}
        </button>
      ) : (
        <Link to={buttonLink} className={styles.homeLink}>
          {buttonText}
        </Link>
      )}
    </div>
  );
};
