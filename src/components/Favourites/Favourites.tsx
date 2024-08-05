import { useContext } from 'react';
import { LikedContext } from '../../store/FavouritesContext';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import styles from './Favourites.module.scss';

export const Favourites = () => {
  const { t } = useTranslation();
  const favouritesState = useContext(LikedContext);

  const productQuantity = favouritesState.length;

  return (
    <section>
      <h1 className={styles.title}>{t(TRANSLATIONS.favourites.title)}</h1>
      <p className={styles.subtitle}>
        {t(TRANSLATIONS.quantity.favourites_interval, {
          postProcess: 'interval',
          count: productQuantity,
        })}
      </p>

      <div className={styles.content}>
        <ul className={styles.list}>
          {favouritesState.map((item: Product) => {
            return (
              <li key={item.id} className={styles.item}>
                <ProductCard product={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
