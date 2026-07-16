import { useGlobalContext } from '../../context/GlobalContext';
import { useLanguage } from '../../context/LanguageContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsList } from '../shared/components/ProductsList';
import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const { favouritesItems } = useGlobalContext();
  const { texts } = useLanguage();

  return (
    <div className="favourites-page">
      <div className="container container--favourites">
        <section className="section section--breadcrumbs">
          <Breadcrumbs
            className="favourites-page__breadcrumbs"
            category="favourites"
          />
        </section>

        <section className="section section--header">
          <h2 className="favourites-page__title">{texts.favourites}</h2>

          <p className="favourites-page__count">
            {favouritesItems.length === 1
              ? `1 ${texts.item}`
              : `${favouritesItems.length} ${texts.items}`}
          </p>
        </section>

        {favouritesItems.length > 0 && (
          <section className="section section--favourites-items">
            <ProductsList
              className="favourites-page__products-list"
              products={favouritesItems}
            />
          </section>
        )}
      </div>
    </div>
  );
};
