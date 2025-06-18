import styles from './FavoutiresCatalog.module.scss';
import { ProductList } from '../../../components/ProductList';
import { useProducts } from '../../../context/ProductsContext';
import { useTranslation } from 'react-i18next';

export const FavoutiresCatalog = () => {
  const { favorites } = useProducts();
  const { t } = useTranslation();

  return (
    <div className={styles.cataloge}>
      <h1 className={styles.cataloge__title}> {t('favourites')}</h1>
      {favorites.length > 0 ? (
        <>
          <div className={styles.cataloge__items_amount}>
            {favorites.length} {t('models')}
          </div>

          <ProductList products={favorites} />
        </>
      ) : (
        <h2 className={styles.cataloge__empty}>
          {t('emptyFavorites')}
        </h2>
      )}
    </div>
  );
};
