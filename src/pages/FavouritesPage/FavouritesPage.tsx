import { BreadCrumbs } from '../../components/BreadCrumbs';
import './FavouritesPage.scss';
// import favouritesEmpty from '../../images/cart-is-empty.png';
import { PorductList } from '../../components/ProductList';
import { useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useAppSelector(state => state.favourites);

  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <section className="favourites">
      <div className="container">
        <BreadCrumbs />
        <h1 className="favourites__title">{t('favouritesPage.title.text')}</h1>

        <div className="favourites__count">
          {t('favouritesPage.title.count', { count: favourites.length })}
        </div>

        {favourites.length ? (
          <PorductList products={favourites} />
        ) : (
          <div className="favourites__empty">
            <p className="favourites__empty-title">
              {t('favouritesPage.title.empty')}
            </p>
            {/* <img
              src={favouritesEmpty}
              alt="Emptyfavourites"
              className="favourites__empty-img"
            /> */}
          </div>
        )}
      </div>
    </section>
  );
};
