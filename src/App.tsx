import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { useContext } from 'react';
import { ContextApp } from './appContext/AppContext';
import { NotFoundPage } from './components/notFoundPage';
import { Home } from './components/home';
import { Tablets } from './components/tablets';
import { Phones } from './components/phones';
import { Accessories } from './components/accessories';
import { Details } from './components/details';
import { Favourites } from './components/favourites/Favourtes';
import { Cart } from './components/cart';
import { BackToTop } from './components/backToTop';
import { ThemeSwitcher } from './components/themeSwitcher/ThemeSwitcher';

export const App = () => {
  const { app, accessories, tablets, phones, backToTop } =
    useContext(ContextApp);

  const handleScroll = () => {
    if (app.current && backToTop.current) {
      if (app.current.scrollTop > 80) {
        backToTop.current.style.marginTop = '0vh';
      } else {
        backToTop.current.style.marginTop = '120vh';
      }
    }
  };

  return (
    <div onScroll={handleScroll} ref={app} className="app">
      <Header />
      <h1 className="app__title">Product Catalog</h1>

      <ThemeSwitcher />

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
        <Route path="accessories/:idItem" element={<Details list={accessories} />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Outlet />

      <div className="app__separator"></div>

      <Footer />
      <BackToTop />
    </div>
  );
};
