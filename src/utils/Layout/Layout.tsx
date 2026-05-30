import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import style from './Layout.module.scss';

export const Layout = () => (
  <div className="App">
    <h1 className="visually-hidden">Product Catalog</h1>

    <Header />

    <main className={style.main__container}>
      <Outlet />
    </main>

    <Footer />
  </div>
);
