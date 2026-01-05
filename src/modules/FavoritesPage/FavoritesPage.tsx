import React from 'react';
import './FavoritesPage.module.scss';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { useProducts } from 'src/context/ProductsContext';
import { ProductCard } from 'shared/ProductCard';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useProducts();

  return (
    <div>
      <Header />
      <h1 className="visually-hidden">Favorites Page</h1>
      <p>Favorites Page content goes here.</p>
      <img src="./../../img/banner-phones.png" alt="" />

      {favorites.length === 0 ? (
        <p>No favorite products yet</p>
      ) : (
        <div>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};
