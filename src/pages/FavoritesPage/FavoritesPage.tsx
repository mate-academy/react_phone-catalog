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
          <section className={favouritesPageStyle.FavouritesSectionGrid}>
            {favouritesProducts.map(product => (
              <div
                className={favouritesPageStyle.FavouritesSectionGridItem}
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};
