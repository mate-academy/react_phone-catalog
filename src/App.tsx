import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Suspense, useContext } from 'react';
import { ContextApp } from './appContext/AppContext';
import { NotFoundPage } from './components/notFoundPage';
import { Home } from './components/home';
// import { Tablets } from './components/tablets';
// import { Phones } from './components/phones';
// import { Accessories } from './components/accessories';
// import { Details } from './components/details';
// import { Favourites } from './components/favourites/Favourtes';
// import { Cart } from './components/cart';
import { BackToTop } from './components/backToTop';
import React from 'react';

const Tablets = React.lazy(() => import('./components/tablets').then(module => ({ default: module.Tablets })));
const Phones = React.lazy(() => import('./components/phones').then(module => ({ default: module.Phones })));
const Accessories = React.lazy(() => import('./components/accessories').then(module => ({ default: module.Accessories })));
const Details = React.lazy(() => import('./components/details').then(module => ({ default: module.Details })));
const Favourites = React.lazy(() => import('./components/favourites/Favourtes').then(module => ({ default: module.Favourites })));
const Cart = React.lazy(() => import('./components/cart').then(module => ({ default: module.Cart })));

export const App = () => {
  const { app, accessories, tablets, phones, backToTop } =
    useContext(ContextApp);

  const handleScroll = () => {
    if (app.current && backToTop.current) {
      if (app.current.scrollTop > 80) {
        backToTop.current.style.marginTop = '0vh';
        backToTop.current.style.display = 'flex';
      } else {
        backToTop.current.style.marginTop = '100vh';
        backToTop.current.style.display = 'none';
      }
    }
  };

  return (
    <div onScroll={handleScroll} ref={app} className="app">
      <Header />
      <h1 className="app__title">Product Catalog</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace={true} />} />

          <Route path="/" element={<Home />} />
          <Route path="fav" element={<Favourites />} />
          <Route path="cart" element={<Cart />} />
          <Route path="phones" element={<Phones />} />
          <Route path="phones/:idItem" element={<Details list={phones} />} />
          <Route path="tablets" element={<Tablets />} />
          <Route path="tablets/:idItem" element={<Details list={tablets} />} />
          <Route path="accessories" element={<Accessories />} />
          <Route
            path="accessories/:idItem"
            element={<Details list={accessories} />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Outlet />

      <div className="app__separator"></div>

      <Footer />
      <BackToTop />
    </div>
  );
};
