import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductCard } from '../ProductCard';
import styles from './Favorite.module.scss';

export const Favorite: React.FC = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();

  return (
    <div className={styles['favorite-page']}>
      <div className={styles['favorite-page__container']}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ul className={styles.breadcrumb__list}>
            <li className={styles.breadcrumb__item}>
              <Link
                to="/"
                className={`${styles.breadcrumb__link} ${styles['breadcrumb__link--home']}`}
              >
                <img
                  src="/images/icons/home.svg"
                  alt="Home"
                  className={styles['breadcrumb__home-icon']}
                />
              </Link>
            </li>
            <li className={styles.breadcrumb__item}>
              <span className={styles.breadcrumb__current}>
                {t('nav.favorites')}
              </span>
            </li>
          </ul>
        </nav>

        <h1 className={styles['favorite-page__title']}>{t('nav.favorites')}</h1>
        <p className={styles['favorite-page__count']}>
          {t('catalog.models_count', { count: favorites.length })}
        </p>

        {favorites.length > 0 ? (
          <div className={styles['favorite-page__grid']}>
            {favorites.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className={styles['favorite-page__empty']}>
            <h2>{t('catalog.no_results')}</h2>
          </div>
        )}
      </div>
    </div>
  );
};
