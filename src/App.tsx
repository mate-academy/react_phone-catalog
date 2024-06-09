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

export const App = () => {
  const { app,accessories } = useContext(ContextApp);
  return (
    <div ref={app} className="app">
      <Header />
      <h1 className="app__title">Product Catalog</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace={true} />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/tablets" element={<Tablets />} />

        <Route path="/accessories">
          <Route index element={<Accessories />} />
          <Route path=':itemId' element={<Details list={accessories} />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Outlet />
      <div className="app__separator"></div>
      <Footer />
    </div>
  );
};
