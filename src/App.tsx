import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header/Header';
import { Product } from './types/Product';
import { Footer } from './modules/shared/components/Footer';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavouritesPage } from './modules/FavouritesPage';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [favourites, setFavourites] = useState<Product[]>([]);

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
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <FavouritesPage
              favourites={favourites}
              onToggleFavourite={toggleFavourite}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};
