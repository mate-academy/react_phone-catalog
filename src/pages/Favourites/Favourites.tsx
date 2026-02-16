/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link } from 'react-router-dom';
import { useFavourites } from '../../context/FavouritesContext';

const Favourites: React.FC = () => {
  const { favourites, removeFromFavourites, clearFavourites } = useFavourites();

  if (favourites.length === 0) {
    return (
      <section className="favourites-page">
        <h2>Favourites</h2>
        <p>You havent added any favourites yet.</p>
        <Link to="/products/phones">Browse products</Link>
      </section>
    );
  }

  return (
    <section className="favourites-page">
      <h2>Favourites ({favourites.length} items)</h2>
      <button
        type="button"
        onClick={clearFavourites}
        style={{ marginBottom: 20 }}
      >
        Clear Favourites
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {favourites.map(product => {
          const price =
            (product as any).priceDiscount ??
            (product as any).priceRegular ??
            (product as any).price;

          return (
            <li
              key={product.id}
              style={{
                border: '1px solid #ddd',
                padding: 10,
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 15,
              }}
            >
              {product.images && product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{ width: 80, height: 80, objectFit: 'cover' }}
                />
              )}
              <div style={{ flex: 1 }}>
                <Link
                  to={`/product/${product.category}/${product.id}`}
                  state={{ product }}
                >
                  {product.name}
                </Link>
                <p>Price: {price ?? '—'}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFromFavourites(product.id)}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Favourites;
