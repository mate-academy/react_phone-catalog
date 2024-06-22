import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { useContext, useEffect } from 'react';
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

export const App = () => {
  const { app, accessories, tablets, phones, backToTop } =
    useContext(ContextApp);

  const handleScroll = () => {
    console.log('ScrollY:', window.pageYOffset );
    if (window.scrollY > 70 && backToTop.current) {
      console.log('in')
      backToTop.current.style.marginTop = '10px';
    }

    if (window.scrollY < 70 && backToTop.current) {
      console.log('in')
      backToTop.current.style.marginTop = '150vh';
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', () => handleScroll());

    return document.removeEventListener('scroll', () => handleScroll());
  }, []);

  return (
    <div ref={app} className="app">
      <Header />
      <h1 className="app__title">Product Catalog</h1>

      <Routes>
        <Route path="/">
          <Route index element={<Home />} />

          <Route path="fav" element={<Favourites />} />

          <Route path="cart" element={<Cart />} />

          <Route path="phones">
            <Route index element={<Phones />} />
            <Route path=":idItem" element={<Details list={phones} />} />
          </Route>

          <Route path="tablets">
            <Route index element={<Tablets />} />
            <Route path=":idItem" element={<Details list={tablets} />} />
          </Route>

          <Route path="accessories">
            <Route index element={<Accessories />} />
            <Route path=":idItem" element={<Details list={accessories} />} />
          </Route>
        </Route>

        <Route path="/home" element={<Navigate to="/" replace={true} />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Outlet />

      <div className="app__separator"></div>

      <Footer />
      <BackToTop />
    </div>
  );
};
