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

export const App = () => {
  const { app, accessories, tablets, phones, backToTop } =
    useContext(ContextApp);

  const handleScroll = () => {
    if (backToTop.current) {
      console.log('offset', window.scrollY);
    }
    if (backToTop.current && backToTop.current.offsetTop < 500) {
      console.log('in');
      backToTop.current.style.marginTop = '110vh';
    } else if ((backToTop.current && backToTop.current.offsetTop > 1150)) {
      console.log('out');
      backToTop.current.style.marginTop = '10px';
    }
  };

  return (
    <div
    onScroll={handleScroll}
    ref={app} className="app">
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
