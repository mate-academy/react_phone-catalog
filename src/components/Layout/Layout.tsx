import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import './Layout.scss';

export const Layout = () => (
  <div className="layout">
    <Header />
    <div className="layout__content">
      <Outlet />
      <Footer />
    </div>
  </div>
);
