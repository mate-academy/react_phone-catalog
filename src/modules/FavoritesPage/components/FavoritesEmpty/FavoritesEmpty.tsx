//#region imports
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../shared/hooks/useTheme';
import styles from './FavoritesEmpty.module.scss';
//#endregion

export const FavoritesEmpty = () => {
  const { t } = useTranslation('favorites');

  const { isDark } = useTheme();
  const imgSrc = isDark
    ? './img/darkTheme/no-favorites.png'
    : './img/no-favorites.png';

  return (
    <section className={styles.favoritesEmpty}>
      <h1>{t('emptyFavorites')}</h1>

      <img className={styles.noFavoritesImg} src={imgSrc} alt="No favorites!" />
    </section>
  );
};
