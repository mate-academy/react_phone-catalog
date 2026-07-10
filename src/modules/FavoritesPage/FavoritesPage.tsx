import { useGlobalContext } from '../../context/GlobalContext';
import { useLanguage } from '../../context/LanguageContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductsList';
import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const { favoritesItems } = useGlobalContext();
  const { texts } = useLanguage();

  return (
    <div className="favorites-page">
      <div className="container container--favorites">
        <section className="section section--breadcrumbs">
          <Breadcrumbs
            className="favorites-page__breadcrumbs"
            category={texts.favourites.toLowerCase()}
          />
        </section>

        <section className="section section--header">
          <h1 className="favorites-page__title">{texts.favourites}</h1>

          <p className="favorites-page__count">
            {favoritesItems.length === 1
              ? `1 ${texts.item}`
              : `${favoritesItems.length} ${texts.items}`}
          </p>
        </section>

        {favoritesItems.length > 0 && (
          <section className="section section--favorites-items">
            <ProductsList
              className="favorites-page__products-list"
              products={favoritesItems}
            />
          </section>
        )}
      </div>
    </div>
  );
};
