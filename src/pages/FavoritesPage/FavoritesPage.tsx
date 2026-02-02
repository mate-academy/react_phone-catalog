import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './FavoritesPage.module.scss';
import { useFavorites } from '../../context/FavoritesContext';
import { ProductCard } from '../../components/ProductCard';

export const FavoritesPage = () => {
  const { t } = useTranslation();
  const { favorites } = useFavorites();

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.homeLink}>
            <img src="/img/Home_breadcrumb.svg" alt={t('icons.homeAlt')} />
          </Link>
          <span className={styles.arrow}>
            <img
              src="/img/arrow_right_gray.svg"
              alt={t('icons.arrowRightAlt')}
            />
          </span>
          <span className={styles.currentCrumb}>{t('favoritesPage.crumb')}</span>
        </div>

        <h1 className={styles.title}>{t('favoritesPage.title')}</h1>
        <p className={styles.modelsCount}>
          {t('common.items', { count: favorites.length })}
        </p>

        <div className={styles.grid}>
          {favorites.map(phone => (
            <ProductCard key={phone.id} phone={phone} />
          ))}
        </div>
      </div>
    </div>
  );
};
