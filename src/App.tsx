import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { AccessoriesPage } from './components/AccessoriesPage/AccessoriesPage';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { FavouritesPage } from './components/FavouritesPage/FavouritesPage';
import { DescriptionPhonesPage } from './components/DescriptionPhonesPage/DescriptionPhonesPage';
import { DescriptionTabletsPage } from './components/DescriptionTabletsPage/DescriptionTabletsPage';
import { DescriptionAccessoriesPage } from './components/DescriptionAccessoriesPage/DescriptionAccessoriesPage';
import { Footer } from './components/Footer/Footer';
import { CartProvider } from './components/Cart/CartContext';
import { CartPage } from './components/Cart/Cart';
import { FavouritesProvider } from './components/FavouritesPage/FavouritesContext';
import { Loader } from './components/Loader/Loader';
import { Contacts } from './components/Contacts/Contacts';

export const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => {
        return new Promise(resolve => {
          setTimeout(() => resolve(data), 1500);
        });
      })
      .then((data: any) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <FavouritesProvider>
      <CartProvider>
        <div className="App">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/phones"
              element={<PhonesPage productsData={products} />}
            />
            <Route
              path="/tablets"
              element={<TabletsPage productsData={products} />}
            />
            <Route
              path="/accessories"
              element={<AccessoriesPage productsData={products} />}
            />
            <Route path="/favorites" element={<FavouritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/phones/:productId?"
              element={<DescriptionPhonesPage productsData={products} />}
            />
            <Route
              path="/tablets/:productId?"
              element={<DescriptionTabletsPage productsData={products} />}
            />
            <Route
              path="/accessories/:productId?"
              element={<DescriptionAccessoriesPage productsData={products} />}
            />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>

          <Footer />
        </div>
      </CartProvider>
    </FavouritesProvider>
  );
};
