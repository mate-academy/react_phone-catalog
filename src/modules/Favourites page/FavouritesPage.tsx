import { useTranslation } from 'react-i18next';
import { useFavourites } from '../../context/FavouritesContext';
import { ProductCard } from '../Home page/components/ProductCard/ProductCard';
import { Breadcrumbs } from '../Product page/components/Breadcrumbs/Breadcrumbs';
import styles from './FavouritesPage.module.scss';
export const FavouritesPage = () => {
  const { favourites } = useFavourites();
  const { t } = useTranslation();

  return (
    <div className={styles.FavouritesPage}>
      <Breadcrumbs className={styles.Breadcrumbs} />

      <div className={styles.FavouritesPage__header}>
        <h1 className={styles.FavouritesPage__title}>
          {t('favourites.title')}
        </h1>
        <div
          className={styles.FavouritesPage__amount}
        >{`${favourites.length} ${t('favourites.items')}`}</div>
      </div>

      <div className={styles.FavouritesPage__main}>
        <ul className={styles.FavouritesPage__list}>
          {favourites.map((product, index) => {
            return (
              <ProductCard product={product} isSlider={false} key={index} />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
