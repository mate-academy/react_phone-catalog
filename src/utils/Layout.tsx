import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import style from './Layout.module.scss';

export const Layout = () => (
  <div className="app">
    <h1 className="visually-hidden">Product Catalog</h1>
    <Header />
    <div className={style.main_container}>
      <Outlet />
    </div>
    <Footer />
  </div>
);
