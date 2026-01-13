import React from 'react';
import { Link } from 'react-router-dom';

interface FavoriteItem {
  id: string;
  configId?: string;
  category: string;
  name: string;
  priceDiscount: number;
}

interface FavoritesProps {
  favorites: FavoriteItem[];
  removeFromFavorites: (identifier: string) => void;
}

function Favorites({ favorites, removeFromFavorites }: FavoritesProps) {
  if (favorites.length === 0) {
    return (
      <div className="catalog">
        <h1 className="catalog-title">♥ Favorites</h1>
        <p>No favorites yet.</p>
      </div>
    );
  }

  return (
    <div className="catalog">
      <h1 className="catalog-title">♥ Favorites</h1>

      {favorites.map(product => (
        <div key={product.configId || product.id} className="product-card">
          <Link
            to={`/${product.category}/${product.id}`}
            className="product-link"
          >
            <h3 className="product-title">
              {product.name.split(' (')[0]}
            </h3>
          </Link>


          <p className="product-price">
            ${product.priceDiscount}
          </p>

          <div className="product-actions">
            <button
              type="button"
              className="neon-text-btn"
              onClick={() =>
                removeFromFavorites(product.configId || product.id)
              }
            >
              ✕ Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Favorites;
