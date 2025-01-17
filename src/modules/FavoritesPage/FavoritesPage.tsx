import { useTranslation } from 'react-i18next';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { useAppSelector } from '../../hooks/hooks';
import styles from './FavoritePage.module.scss';
import { ProductGallery } from '../../components/ProductGallery';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import emptyFavoritesImg from '../../images/product-not-found.png';
import { useNavigate } from 'react-router-dom';
import { GoBackButton } from '../../components/GoBackButton/GoBackButton';

export const FavoritesPage = () => {
  const { favoriteProducts } = useAppSelector(state => state.favorites);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className={styles.favoritesPage} id="favorites">
      <div className={styles.container}>
        <BreadCrumbs />
        <h1 className={styles.title}>{t('favoritesPage.title')}</h1>

        {isLoading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <p className={styles.count}>
            {t('favoritesPage.count', { count: favoriteProducts.length })}
          </p>
        )}

        {isLoading ? null : favoriteProducts.length > 0 ? (
          <ProductGallery products={favoriteProducts} />
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>{t('favoritesPage.empty')}</p>
            <img
              src={emptyFavoritesImg}
              alt="Empty Favorites"
              className={styles.img}
            />

            <GoBackButton title={t('buttonBack.back')} onClick={handleGoBack} />
          </div>
        )}
      </div>
    </div>
  );
};
