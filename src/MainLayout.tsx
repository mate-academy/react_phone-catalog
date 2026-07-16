import { Outlet } from 'react-router-dom';
import './MainLayout.scss';
import { Footer } from './modules/shared/components/Footer';
import { Header } from './modules/shared/components/Header';

export const MainLayout = () => (
  <div className="app" id="top">
    <h1 hidden>Product Catalog</h1>
    <Header className="app__header" />
    <div className="app__main">
      <Outlet />
    </div>
    <Footer className="app__footer" />
  </div>
);
