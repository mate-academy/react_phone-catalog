import { Routes, Route } from 'react-router-dom';
import { Layout } from './shared/components/Layout/Layout';

import { HomePage } from './modules/HomePage/HomePage';
import { ProductsPage } from './modules/ProductsPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { useState } from 'react';
import type { Product } from './types';
import type { CartItem } from './types';

import './App.scss';

export const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.product.itemId === product.itemId,
      );

      if (existing) {
        return prev.map(item =>
          item.product.itemId === product.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleDecrease = (productId: string) => {
    setCart(prev =>
      prev
        .map(item =>
          item.product.itemId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const handleRemove = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.itemId !== productId));
  };

  const handleToggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.some(item => item.itemId === product.itemId)
        ? prev.filter(item => item.itemId !== product.itemId)
        : [...prev, product],
    );
  };

  const handleCheckout = () => {
    setCart([]);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout cart={cart} favorites={favorites} />}>
        <Route
          index
          element={
            <HomePage
              cart={cart}
              favorites={favorites}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />

        <Route
          path="phones"
          element={
            <ProductsPage
              cart={cart}
              favorites={favorites}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />
        <Route
          path="tablets"
          element={
            <ProductsPage
              cart={cart}
              favorites={favorites}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />
        <Route
          path="accessories"
          element={
            <ProductsPage
              cart={cart}
              favorites={favorites}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />

        <Route
          path="/product/:productId"
          element={
            <ProductDetailsPage
              cart={cart}
              favorites={favorites}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />
        <Route
          path="cart"
          element={
            <CartPage
              cart={cart}
              onCheckout={handleCheckout}
              onIncrease={handleAddToCart}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
            />
          }
        />

        <Route
          path="favorites"
          element={
            <FavoritesPage
              cart={cart}
              favorites={favorites}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
