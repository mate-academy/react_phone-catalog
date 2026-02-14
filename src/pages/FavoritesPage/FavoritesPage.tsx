import './FavoritesPage.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { PorductsList } from '../../components/ProductsList';
import { useAppSelector } from '../../customHooks/customHooks';
import { useEffect } from 'react';
import emptyFavorites from '../../images/product-not-found.png';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useAppSelector(state => state.favorites);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return (
    <section className="favorites">
      <BreadCrumbs />
      <h1 className="favorites__title">Favorites</h1>

      <div className="favorites__count">{`${favorites.length} items`}</div>

      {favorites.length ? (
        <PorductsList products={favorites} />
      ) : (
        <div className="favorites__empty">
          <p className="favorites__empty_title">
            Add some products in your Favorites
          </p>
          <img
            src={emptyFavorites}
            alt="Emptyfavourites"
            className="favorites__empty_img"
          />
        </div>
      )}
    </section>
  );
};
