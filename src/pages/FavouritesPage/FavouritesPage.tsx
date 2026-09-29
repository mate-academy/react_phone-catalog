import React from 'react';
import { useShop } from '../../context/ShopContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
import './FavouritesPage.scss';

export const FavouritesPage: React.FC = () => {
  useDocumentTitle('Favourites - Nice Gadgets');
  const { favourites, cartIds, favouriteIds, toggleFavourite, addToCart } =
    useShop();

  return (
    <div className="favourites-page">
      <Breadcrumbs items={[{ label: 'Favourites' }]} />

      <h1 className="favourites-page__title">Favourites</h1>
      <p className="favourites-page__count">{favourites.length} items</p>

      {favourites.length === 0 ? (
        <p className="favourites-page__empty">
          You have no favourite products yet. Tap the heart icon on any product
          to add it here.
        </p>
      ) : (
        <ProductsList
          products={favourites}
          favouriteIds={favouriteIds}
          cartIds={cartIds}
          onToggleFavourite={toggleFavourite}
          onAddToCart={addToCart}
          variant="compact"
        />
      )}
    </div>
  );
};
