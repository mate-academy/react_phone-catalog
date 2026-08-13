import './App.scss';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { HomePage } from './Components/HomePage';
import { NotFoundPage } from './Components/NotFoundPage';
import { Navbar } from './Components/Navbar';
import { NavbarFooter } from './Components/Navbarfooter';
import { Phones } from './Components/ProductsList/phones';
import { ProductPage } from './Components/ProductPage';
import { Favourites } from './Components/Favourites';
import { Tablets } from './Components/ProductsList/tablets';
import { Cart } from './Components/Cart';
import { Accessories } from './Components/ProductsList/accesorries';
import React, { useState, useEffect } from 'react';

export interface NewModel {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export const AppContent: React.FC = () => {
  const [models, setModels] = useState<NewModel[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<NewModel | null>(null);
  const [FavouritesA, setFavouritesA] = useState<NewModel[]>([]);
  const [cart, setcart] = useState<NewModel[]>([]);

  const addingObj = (obj: NewModel) => {
    setFavouritesA(prevArray => {
      const Existfb = prevArray.some(cobj => cobj.id === obj.id);

      if (Existfb) {
        return prevArray.filter(cobj => cobj.id !== obj.id);
      } else {
        return [...prevArray, obj];
      }
    });
  };

  const addingObjCart = (obj: NewModel) => {
    setcart(prevArray => {
      const Existfb = prevArray.some(cobj => cobj.id === obj.id);

      if (Existfb) {
        return prevArray.filter(cobj => cobj.id !== obj.id);
      } else {
        return [...prevArray, obj];
      }
    });
  };

  useEffect(() => {
    fetch('api/products.json')
      .then(response => response.json())
      .then(data => {
        setModels(data);
      })
      /* eslint-disable-next-line */
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <>
      <div data-cy="app">
        <Navbar FavouritesA={FavouritesA} Cart={cart} />
        <main className="section">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    cart={cart}
                    addingObjCart={addingObjCart}
                    array={models}
                    setsmth={product => setSelectedProduct(product)}
                    addingObj={addingObj}
                    FavouritesA={FavouritesA}
                  />
                }
              />
              <Route
                path="/phones"
                element={
                  <Phones
                    cart={cart}
                    addingObjCart={addingObjCart}
                    array={models}
                    setsmth={product => setSelectedProduct(product)}
                    addingObj={addingObj}
                    FavouritesA={FavouritesA}
                  />
                }
              />

              <Route
                path="/tablets"
                element={
                  <Tablets
                    cart={cart}
                    addingObjCart={addingObjCart}
                    array={models}
                    setsmth={product => setSelectedProduct(product)}
                    addingObj={addingObj}
                    FavouritesA={FavouritesA}
                  />
                }
              />

              <Route
                path="/accessories"
                element={
                  <Accessories
                    cart={cart}
                    addingObjCart={addingObjCart}
                    array={models}
                    setsmth={product => setSelectedProduct(product)}
                    addingObj={addingObj}
                    FavouritesA={FavouritesA}
                  />
                }
              />

              <Route
                path="/:category/:productId"
                element={
                  <ProductPage
                    key={selectedProduct?.itemId || 'default'}
                    cart={cart}
                    addingObjCart={addingObjCart}
                    FavouritesA={FavouritesA}
                    addingObj={addingObj}
                    selectedProduct={selectedProduct}
                    setsmth={product => setSelectedProduct(product)}
                  />
                }
              />

              <Route
                path="/favourites"
                element={
                  <Favourites addingObj={addingObj} FavouritesA={FavouritesA} />
                }
              />
              <Route
                path="/cart"
                element={<Cart addingObjCart={addingObjCart} cart={cart} />}
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
        <NavbarFooter />
      </div>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};
