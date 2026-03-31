import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header/Header';
import { CartItems, Product } from './types/Product';
import { Footer } from './modules/shared/components/Footer';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { CartsPage } from './modules/CartsPage';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [favourites, setFavourites] = useState<Product[]>([]);
  const [carts, setCarts] = useState<CartItems[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then((dataProducts: Product[]) => setProducts(dataProducts));
  }, []);

  const toggleFavourite = (product: Product) => {
    setFavourites(prev => {
      const isAlreadyAdded = prev.some(item => item.id === product.id);

      if (isAlreadyAdded) {
        return prev.filter(item => item.id !== product.id);
      }

      return [...prev, product];
    });
  };

  const handleAddToCarts = (product: Product) => {
    setCarts(prev => {
      const exist = prev.find(item => item.product.itemId === product.itemId);

      if (exist) {
        return prev.map(item =>
          item.product.itemId === product.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: `${product.itemId}-${Date.now()}`,
          product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCarts(prev => prev.filter(item => item.id !== cartId));
  };

  const increaseQuantity = (cartId: string) => {
    setCarts(prev =>
      prev.map(item =>
        item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (cartId: string) => {
    setCarts(prev =>
      prev.map(item =>
        item.id === cartId ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
  };

  return (
    <div className="page-backgraund">
      <Header openMenu={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={products}
              favourites={favourites}
              onToggleFavourite={toggleFavourite}
              onAddToCart={handleAddToCarts}
            />
          }
        />
        <Route
          path="/phones"
          element={
            <PhonesPage
              products={products}
              favourites={favourites}
              onToggleFavourite={toggleFavourite}
              onAddToCart={handleAddToCarts}
            />
          }
        />
        <Route
          path="/tablets"
          element={
            <TabletsPage
              products={products}
              favourites={favourites}
              onToggleFavourite={toggleFavourite}
              onAddToCart={handleAddToCarts}
            />
          }
        />
        <Route
          path="/accessories"
          element={
            <AccessoriesPage
              products={products}
              favourites={favourites}
              onToggleFavourite={toggleFavourite}
              onAddToCart={handleAddToCarts}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={
            <ProductDetailsPage
              products={products}
              favourites={favourites}
              onToggleFavourite={toggleFavourite}
              onAddToCart={handleAddToCarts}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <FavouritesPage
              favourites={favourites}
              onToggleFavourite={toggleFavourite}
              onAddToCart={handleAddToCarts}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartsPage
              carts={carts}
              onRemove={removeFromCart}
              onDecrease={decreaseQuantity}
              onIncrease={increaseQuantity}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};
