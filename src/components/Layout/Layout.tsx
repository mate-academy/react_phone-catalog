import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const Layout = () => (
  <div className="app">
    <Header />
    <div className="main main__container">
      <Outlet />
    </div>
    <Footer />
  </div>
);
