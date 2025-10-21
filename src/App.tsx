import './Index.scss';
import './App.module.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './modules/shared/components/Footer/Footer';
import { Header } from './modules/shared/components/Header/Header';
import ScrollToTop from './modules/shared/components/ScrollToTop/ScrollToTop';

export const App = () => {
  return (
    <div className="app">
      <div className="container">
        <ScrollToTop />

        <Header />

        <Outlet />

        <Footer />
      </div>
    </div>
  );
};
