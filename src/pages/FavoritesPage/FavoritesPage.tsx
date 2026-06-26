import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useFavoritesStateValue } from '../../context';
import { ProductCard } from '../../components/ProductCard';
import favouritesPageStyle from './FavouritesPage.module.scss';
import classNames from 'classnames';

export const FavoritesPage = () => {
  const favouritesProducts = useFavoritesStateValue().products;

  return (
    <>
      <div className="container">
        <div className={favouritesPageStyle.FavouritesPage}>
          <Breadcrumbs items={[{ title: 'Favourites' }]} />
          <h1
            className={classNames(
              'font-h1',
              favouritesPageStyle.FavouritesTitle,
            )}
          >
            Favourites
          </h1>
          <p
            className={classNames(
              'font-body',
              favouritesPageStyle.FavouritesCounter,
            )}
          >
            {favouritesProducts.length} items
          </p>
          {favouritesProducts.length > 0 ? (
            <section className={favouritesPageStyle.FavouritesSectionGrid}>
              {favouritesProducts.map(product => (
                <div
                  key={product.id}
                  className={favouritesPageStyle.FavouritesSectionGridItem}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </section>
          ) : (
            <div className={favouritesPageStyle.NotAddedProducts}>
              <h2 className={favouritesPageStyle.NotAddedTitle}>
                Favourite products have not been added yet
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
