import { useContext } from 'react';
import { LikedContext } from '../../store/FavouritesContext';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';

export const Favourites = () => {
  const { t } = useTranslation();
  const favouritesState = useContext(LikedContext);

  const productQuantity = favouritesState.length;

  return (
    <section className="favourites">
      <h1 className="favourites__title">{t(TRANSLATIONS.favourites.title)}</h1>
      <p className="favourites__subtitle">
        {t(TRANSLATIONS.quantity.favourites_interval, {
          postProcess: 'interval',
          count: productQuantity,
        })}
      </p>

      <div className="favourites__content">
        <ul className="favourites__list">
          {favouritesState.map((item: Product) => {
            return (
              <li key={item.id} className="favourites__item">
                <ProductCard product={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
