import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './modules/Header';
import Footer from './modules/Footer';
import ScrollToTop from './modules/shared/components/ScrollToTop';

export const App = () => {
  return (
    <>
      <ScrollToTop />
      <div className="App">
        <h1 className="visually-hidden">Product Catalog</h1>
        <Header />
        <main className="main">{<Outlet />}</main>
        <Footer />
      </div>
    </>
  );
};
