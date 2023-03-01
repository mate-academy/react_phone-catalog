import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import '../helpers/page.scss';
import '../helpers/grid.scss';
import { Product } from '../types/Product';
import { ProductCard } from '../components/ProductCard';

type Props = {
//   addProductToCart: (product: Product) => void;
//   addProductToFavourites: (product: Product) => void;
};

export const FavouritesPage: React.FC<Props> = () => {
  const favouritesFromLocalStorage = localStorage.getItem('favourites');
  const favourites: Product[] = favouritesFromLocalStorage
    ? JSON.parse(favouritesFromLocalStorage)
    : [];

  const [query, setQuery] = useState('');

  const filteredProducts = query
    ? favourites
      .filter(product => {
        return product.name.toLowerCase().includes(query.toLowerCase().trim());
      })
    : [...favourites];

  return (
    <div className="page">
      <Header search="favourites" setQuery={setQuery} />

      <div className="page__content">
        <h1 className="page__title">
          Favourites
        </h1>

        <h2 className="page__subtitle">
          models
        </h2>

        {favourites.length > 0
          ? (
            <div className="page__cards-list">
              {filteredProducts.map(product => (
                <ProductCard
                  product={product}
                  // addProductToCart={addProductToCart}
                  // addProductToFavourites={addProductToFavourites}
                />
              ))}
            </div>
          ) : (
            <p>Your favourites cart is empty</p>
          )}
      </div>

      <Footer />
    </div>
  );
};
