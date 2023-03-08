import React, { useState, useContext } from 'react';
import './page.scss';
import '../styles/grid.scss';

import { ProductsContext } from '../helpers/ProductsContext';
import { Header } from '../components/Header/Header';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { Footer } from '../components/Footer/Footer';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(ProductsContext);
  const numberOfFavourites = favorites.length;

  const [query, setQuery] = useState('');

  const filteredProducts = query
    ? favorites
      .filter(product => {
        return product.name.toLowerCase().includes(query.toLowerCase().trim());
      })
    : [...favorites];

  return (
    <div className="page">
      <Header search="favourites" setQuery={setQuery} />

      <div className="page__content">
        <h1 className="page__title">
          Favourites
        </h1>

        <h2 className="page__subtitle">
          {`${numberOfFavourites} items`}
        </h2>

        <section className="page__section">
          {favorites.length > 0
            ? (
              <div className="page__cards-list">
                {filteredProducts.map(product => (
                  <ProductCard product={product} />
                ))}
              </div>
            ) : (
              <p>Your favourites cart is empty</p>
            )}
        </section>
      </div>

      <Footer />
    </div>
  );
};
