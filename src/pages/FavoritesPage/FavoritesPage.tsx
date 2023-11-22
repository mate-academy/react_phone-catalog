import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useCartFavorites } from '../../providers/CartFavoritesProvider';
import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const { state: { favorites } } = useCartFavorites();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const filteredFavorites = favorites.filter(
    product => product.name.toLowerCase().trim()
      .includes(query.toLowerCase().trim()),
  );

  return (
    <div className="favoritespage">
      <div className="favoritespage_currentpage">
        <Link to="/" className="favoritespage_currentpage_homelink" />
        <p className="favoritespage_currentpage_arrow" />
        <p className="favoritespage_currentpage_pagename">Favorites</p>
      </div>
      <h1 className="favoritespage_title">Favorites Page</h1>
      {favorites.length === 0 ? (
        <h1 className="favoritespage_title">Your Favorites is empty.</h1>
      ) : (
        <ul className="favoriteswindow">
          {filteredFavorites.map(product => {
            return (
              <div className="favoriteswindow_product" key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};
