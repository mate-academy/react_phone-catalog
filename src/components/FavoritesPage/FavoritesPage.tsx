import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { ProductList } from '../ProductList';
import './FavoritesPage.scss';
import { BreadCrumbs } from '../BreadCrumbs';

export const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  if (!favorites.length) {
    return (
      <section className="favorites-page">
        <h1 className="favorites-page__title">Favorites</h1>

        <p className="favorites-page__empty">
          You have no favorite products yet
        </p>
      </section>
    );
  }

  return (
    <>
      <BreadCrumbs category="Favorites" />

      <section className="favorites-page">
        <h1 className="favorites-page__title">Favorites</h1>

        <p className="favorites-page__amount">{favorites.length} items</p>

        <ProductList products={favorites} />
      </section>
    </>
  );
};
