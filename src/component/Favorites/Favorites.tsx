// Favorites.tsx
import './Favorites.scss';
import { useEffect, useState } from 'react';
import { ProductItem } from '../types/Phone';
import { NavigationInPage } from '../NavigationInPage';
import { CountItem } from '../CountItem';
import { Product } from '../Product';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  const [favorites, setFavorites] = useState<ProductItem[]>([]);
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    fetch('./api/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Помилка при завантаженні даних');
        }

        return response.json();
      })
      .then((data: ProductItem[]) => {
        setAllProducts(data);
      });
  }, []);

  useEffect(() => {
    const updateFavorites = () => {
      const favoritesFromStorage = JSON.parse(
        localStorage.getItem('favorite') || '[]',
      );

      setFavorites(
        allProducts.filter(item => favoritesFromStorage.includes(item.itemId)),
      );
    };

    updateFavorites(); // Початкове завантаження

    window.addEventListener('favoritesChanged', updateFavorites);

    return () => {
      window.removeEventListener('favoritesChanged', updateFavorites);
    };
  }, [allProducts]);

  return (
    <div className="main__favorites">
      <NavigationInPage />
      <h1 className="title__favorites">Favorites</h1>
      <CountItem count={favorites.length} />
      <div className="catalog__favorites">
        {favorites.map(item => (
          <Link
            to={`../${item.category}/${item.itemId}`}
            key={item.id}
            className="card"
          >
            <Product product={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};
